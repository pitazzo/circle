import { Result } from "../../infraestructure/result";
import { Column } from "typeorm";
import { ID } from "./id";

export class IDList {
  @Column("varchar", { array: true, nullable: true })
  private _value: string[];

  get value(): string[] {
    return this._value;
  }

  private constructor(ids: string[]) {
    this._value = ids;
  }

  public static create(ids: string[]): Result<IDList> {
    const regex = new RegExp(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );

    if (
      ids === undefined ||
      ids === null ||
      !ids.every((id) => regex.test(id))
    ) {
      return Result.fail<IDList>("ID has to be a valid UUID");
    }
    return Result.ok<IDList>(new IDList(ids));
  }

  public addIDIfAbsent(id: ID) {
    const index = this._value.indexOf(id.value);
    if (index === -1) {
      this._value.push(id.value);
    }
    
  }
}
