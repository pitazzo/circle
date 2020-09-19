import { Injectable } from '@nestjs/common';
import { Publisher } from './shared/domain/publisher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AMQPService,
  ID,
  Email,
  UserSubscribedEvent,
  Title,
  Body,
} from 'circle-core';
import { MailService } from './mail.service';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private publishersRepository: Repository<Publisher>,
    private amqpService: AMQPService,
    private mailService: MailService,
  ) {}

  public async susbcribe(subscriberID: ID, publisherID: ID): Promise<void> {
    const publisher = await this.publishersRepository.findOne({
      publisherID: publisherID,
    });
    publisher.subscribersID.addIDIfAbsent(subscriberID);
    this.publishersRepository.save(publisher).then(publisher => {
      this.amqpService.publishEvent(
        new UserSubscribedEvent(publisherID.value, subscriberID.value),
      );
    });
  }

  public async registerUser(publisherID: ID, email: Email): Promise<void> {
    const publisher = Publisher.create(publisherID, email);
    await this.publishersRepository.save(publisher);
  }

  public async updateUser(publisherID: ID, newEmail: Email): Promise<void> {
    const publisher = await this.publishersRepository.findOne({
      publisherID: publisherID,
    });
    if (!publisher) {
      console.error('Received unknown publisher (' + publisherID.value + ')');
      return;
    }

    publisher.email = newEmail;
    await this.publishersRepository.save(publisher);
  }

  public async notifityPublish(
    publisherID: ID,
    title: Title,
    body: Body,
  ): Promise<void> {
    const publisher = await this.publishersRepository.findOne({
      publisherID: publisherID,
    });
    if (!publisher) {
      console.error('Received unknown publisher (' + publisherID.value + ')');
      return;
    }
    publisher.subscribersID.value.forEach(subscriberID => {
      this.publishersRepository
        .findOne({
          publisherID: ID.create(subscriberID).getValue(),
        })
        .then(subscriber => {
          this.mailService.sendMessage(
            subscriber.email,
            '¡Nueva publicación de ' + publisherID.value + '!',
            publisherID.value +
              ' ha añadido una nueva publicación llamada ' +
              title.value +
              '.\n\n' +
              body.value,
          );
        });
    });
  }

  public async notifityLike(
    publisherID: ID,
    likerID: ID,
    postID: ID,
  ): Promise<void> {
    const publisher = await this.publishersRepository.findOne({
      publisherID: publisherID,
    });
    this.mailService.sendMessage(
      publisher.email,
      '¡Nuevo like de ' + likerID.value + '!',
      'A ' + likerID.value + 'le ha gustado tu post ' + postID.value,
    );
  }

  public async notifitySubscription(
    publisherID: ID,
    subscriberID: ID,
  ): Promise<void> {
    const publisher = await this.publishersRepository.findOne({
      publisherID: publisherID,
    });
    this.mailService.sendMessage(
      publisher.email,
      '¡Nuevo suscriptor!',
      subscriberID.value + ' se ha suscrito a tus publicaciones',
    );
  }
}
