import { Result } from 'circle-core';
import { Column } from 'typeorm';

export class Username {
  @Column()
  _value: string;

  get value(): string {
    return this._value;
  }

  private constructor(value: string) {
    this._value = value;
  }

  public static create(username: string): Result<Username> {
    const regexp = new RegExp(/^[a-zA-Z0-9]+$/);

    if (
      username === undefined ||
      username === null ||
      username.length < 3 ||
      username.length > 20
    ) {
      return Result.fail<Username>(
        'Username must be between 3 and 20 characters long',
      );
    }
    if (!regexp.test(username)) {
      return Result.fail<Username>(
        'Username must only contain letters and numbers',
      );
    }
    return Result.ok<Username>(new Username(username));
  }
}
