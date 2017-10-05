import { Observable } from 'tns-core-modules/data/observable';
import { GoogleplacesAutocomplete, PlaceTypes } from 'nativescript-googleplaces-autocomplete';

export class HelloWorldModel extends Observable {
  public message: string;
  private googleplacesAutocomplete: GoogleplacesAutocomplete;
  constructor() {
    super();
    setTimeout(() => {
      this.googleplacesAutocomplete = new GoogleplacesAutocomplete();
      this.googleplacesAutocomplete.init("AIzaSyBjJ4O4S-rYJytOg_wEEdUoDaoCazvRU_E");
      this.googleplacesAutocomplete.get("Bacau", PlaceTypes.City);
    }, 5000);
    
  }
}
