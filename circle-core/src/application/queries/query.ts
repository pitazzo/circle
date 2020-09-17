import { Operation } from "../operation";

export class Query extends Operation {
  constructor(
    id: string,
    attributes: Record<string, any>,
    extraMetadata: Record<string, any>
  ) {
    super(id, "query", attributes, extraMetadata);
  }
}
