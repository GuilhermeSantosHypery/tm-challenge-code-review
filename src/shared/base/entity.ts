const isEntity = (v: any): v is Entity<any, any> => {
  return v instanceof Entity;
};

export abstract class Entity<T, ID> {
  public readonly _id: ID;
  public readonly props: T;

  constructor(props: T, id?: string) {
    this._id = id ? id : (props as any).id;
    this.props = props;
  }

  public equals(object?: Entity<T, ID>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }
}
