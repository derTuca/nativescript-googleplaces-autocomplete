import { Observable } from 'tns-core-modules/data/observable';
import { GoogleplacesAutocomplete } from 'nativescript-googleplaces-autocomplete';

export class HelloWorldModel extends Observable {
  public message: string;
  private googleplacesAutocomplete: GoogleplacesAutocomplete;

  constructor() {
    super();

    this.googleplacesAutocomplete = new GoogleplacesAutocomplete();
    this.message = this.googleplacesAutocomplete.message;
  }
}
