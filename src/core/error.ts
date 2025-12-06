export class UnwrapError extends Error {
  origin: unknown;
  constructor(message: string, origin: unknown) {
    super(message);
    this.name = "UnwrapError";
    this.origin = origin;
  }
}
