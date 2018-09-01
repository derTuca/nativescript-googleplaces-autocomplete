import { Observable } from 'tns-core-modules/data/observable';

export class Common extends Observable {
  public message: string;

  constructor() {
    super();
  }

}
