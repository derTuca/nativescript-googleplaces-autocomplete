
import { Common } from './googleplaces-autocomplete.common';
import { AutocompletePrediction } from './autocomplete-prediction';
import { FilterTypes } from './filter-types';

declare var GMSPlacesClient: any;
declare var GMSAutocompleteFilter;
declare var kGMSPlacesAutocompleteTypeFilterRegion: any;
declare var kGMSPlacesAutocompleteTypeFilterCity: any;
declare var kGMSPlacesAutocompleteTypeFilterNoFilter: any;
declare var kGMSPlacesAutocompleteTypeFilterGeocode: any;
declare var kGMSPlacesAutocompleteTypeFilterAddress: any;
declare var kGMSPlacesAutocompleteTypeFilterEstablishment: any;

export class GoogleplacesAutocomplete {
    key: string;
    init(apiKey: string) {
        this.key = apiKey;
    }
    get(query: string, filterType: FilterTypes): Promise<AutocompletePrediction[]> {
        let filter;
        switch(filterType) {
            case FilterTypes.Region:
                filter = kGMSPlacesAutocompleteTypeFilterRegion;
                break;
            case FilterTypes.Address:
                filter = kGMSPlacesAutocompleteTypeFilterAddress;
                break;
            case FilterTypes.City:
                filter = kGMSPlacesAutocompleteTypeFilterCity;
                break;
            case FilterTypes.Establishment:
                filter = kGMSPlacesAutocompleteTypeFilterEstablishment;
                break;
            case FilterTypes.Geocode:
                filter = kGMSPlacesAutocompleteTypeFilterGeocode;
                break;
            case FilterTypes.NoFilter:
                filter = kGMSPlacesAutocompleteTypeFilterNoFilter;
                break;
        }
        return new Promise((resolve, reject) => {
            if (this.key == null) reject("Run init first!");
            GMSPlacesClient.provideAPIKey(this.key);
            let client = GMSPlacesClient.sharedClient();
            let filter = new GMSAutocompleteFilter();
            filter.type = filterType;
            client.autocompleteQueryBoundsFilterCallback(query, null, filter, (serverResponse: NSMutableArray<any>, err: NSError) => {
                if(err) reject(err.localizedDescription);
                let response: AutocompletePrediction[] = [];
                for (let i = 0; i < serverResponse.count; i++) {
                    let obj = new AutocompletePrediction();
                    obj.id = serverResponse[i].placeID;
                    obj.prediction = serverResponse[i].attributedFullText.string;
                    response.push(obj);
                }
                resolve(response);
            });
        });
    }
}
