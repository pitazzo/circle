export class Operation {
  private id: string;
  private type: string;
  private ocurredOn: Date;
  private attributes: Record<string, any>;
  private meta: Record<string, any>;

  constructor(
    id: string,
    type: string,
    attributes: Record<string, any>,
    extraMetadata: Record<string, any>
  ) {
    this.id = id;
    this.type = type;
    this.ocurredOn = new Date();
    this.attributes = attributes;
    extraMetadata["host"] = process.env.HOST;
    this.meta = extraMetadata;
  }

  public getId() {
    return this.id;
  }

  public getType() {
    return this.type;
  }

  public getOcurredOn() {
    this.ocurredOn;
  }

  public getAttributes() {
    this.attributes;
  }

  public getMeta() {
    return this.meta;
  }
}