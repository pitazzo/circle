import { Column } from "typeorm";
import { Result } from "../../infraestructure/result";

export class Title {
  @Column()
  _value: string;

  get value(): string {
    return this._value;
  }

  private constructor(value: string) {
    this._value = value;
  }

  public static create(title: string): Result<Title> {
    const regexp = new RegExp(/^[a-zA-Z0-9 ¡!¿?.,]+$/);

    if (
      title === undefined ||
      title === null ||
      title.length < 5 ||
      title.length > 40
    ) {
      return Result.fail<Title>(
        "Title must be between 5 and 20 characters long"
      );
    }
    if (!regexp.test(title)) {
      return Result.fail<Title>(
        "Title must only contain letters and numbers"
      );
    }
    return Result.ok<Title>(new Title(title));
  }
}
