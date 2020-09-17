import { Operation } from "../operation";

export class Event extends Operation {
  constructor(
    id: string,
    attributes: Record<string, any>,
    extraMetadata: Record<string, any>
  ) {
    super(id, "event", attributes, extraMetadata);
  }
}
