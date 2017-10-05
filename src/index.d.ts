import { Common } from './googleplaces-autocomplete.common';
export declare class AutocompletePrediction {
  prediction: string;
  id: string;
}
export declare const enum PlaceTypes {
  Region,
  City,
  NoFilter,
  Geocode,
  Address,
  Establishment
}
export declare class GoogleplacesAutocomplete {
  // define your typings manually
  // or..
  // take the ios or android .d.ts files and copy/paste them here
  init(apiKey: string);
  get(query: string, placeType: PlaceTypes): Promise<AutocompletePrediction>;
}
