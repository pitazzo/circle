import { Column } from "typeorm";
import { Result } from "../../infraestructure/result";

export class Body {
  @Column()
  _value: string;

  get value(): string {
    return this._value;
  }

  private constructor(value: string) {
    this._value = value;
  }

  public static create(body: string): Result<Body> {
    const regexp = new RegExp(/^[a-zA-Z0-9]+$/);

    if (
      body === undefined ||
      body === null ||
      body.length < 5 ||
      body.length > 1000
    ) {
      return Result.fail<Body>(
        "Body must be between 5 and 1000 characters long"
      );
    }
    return Result.ok<Body>(new Body(body));
  }
}
