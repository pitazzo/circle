import { Column } from "typeorm";
import { Result } from "../../infraestructure/result";

export class Email {
  @Column()
  _value: string;

  get value(): string {
    return this._value;
  }

  private constructor(value: string) {
    this._value = value;
  }

  public static create(email: string): Result<Email> {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (email === undefined || email === null || !regexp.test(email)) {
      return Result.fail<Email>("Email has to be a valid address");
    }
    return Result.ok<Email>(new Email(email));
  }
}
