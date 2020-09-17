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
import { Subscriber } from 'rxjs';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private publishersRepository: Repository<Publisher>,
    private amqpService: AMQPService,
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
        .then(subscriber =>
          console.log(
            'Enviando mail a ' + subscriber.email.value + ' por ser suscriptor',
          ),
        );
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
    console.log('Enviando mail a ' + publisher.email.value + ' por recibir un like');
  }

  public async notifitySubscription(
    publisherID: ID,
    subscriberID: ID,
  ): Promise<void> {
    const publisher = await this.publishersRepository.findOne({
      publisherID: publisherID,
    });
    console.log('Enviando mail a ' + publisher.email.value + ' por nuevo suscriptor');
  }
}
