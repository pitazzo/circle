import { Result } from "../../infraestructure/result";
import { Column } from "typeorm";

export class ID {

  @Column()
  private _value: string;

  get value(): string {
    return this._value;
  }

  private constructor(id: string) {
    this._value = id;
  }

  public static create(id: string): Result<ID> {
    const regex = new RegExp(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );

    if (id === undefined || id === null || !regex.test(id)) {
      return Result.fail<ID>("ID has to be a valid UUID");
    }
    return Result.ok<ID>(new ID(id));
  }
}
