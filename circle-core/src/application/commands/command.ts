import { Operation } from "../operation";

export class Command extends Operation {
  constructor(
    id: string,
    attributes: Record<string, any>,
    extraMetadata: Record<string, any>
  ) {
    super(id, "command", attributes, extraMetadata);
  }
}
