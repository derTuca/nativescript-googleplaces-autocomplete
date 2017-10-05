import { AutocompletePrediction } from './autocomplete-prediction';
import { Common } from './googleplaces-autocomplete.common';
import * as app from "tns-core-modules/application";
declare var com: any;

export const enum FilterTypes {
    Region,
    City,
    NoFilter,
    Geocode,
    Address,
    Establishment
}

export class GoogleplacesAutocomplete {
    init(key: string) {
    }
    get(query: string, filterType: FilterTypes): Promise<AutocompletePrediction[]> {
        let placesNamespace = com.google.android.gms.location.places;
        return new Promise((resolve, reject) => {
            let filter = new placesNamespace.AutocompleteFilter.Builder();
            let bounds = {};
            switch(filterType) {
                case FilterTypes.Address:
                    filter = filter.setTypeFilter(placesNamespace.AutocompleteFilter.TYPE_FILTER_ADDRESS).build();
                    break;
                case FilterTypes.City:
                    filter = filter.setTypeFilter(placesNamespace.AutocompleteFilter.TYPE_FILTER_CITIES).build();
                    break;
                case FilterTypes.Establishment:
                    filter = filter.setTypeFilter(placesNamespace.AutocompleteFilter.TYPE_FILTER_ESTABLISHMENT).build();
                    break;
                case FilterTypes.NoFilter:
                    filter = filter.setTypeFilter(placesNamespace.AutocompleteFilter.TYPE_FILTER_NONE).build();
                    break;
                case FilterTypes.Geocode:
                    filter = filter.setTypeFilter(placesNamespace.AutocompleteFilter.TYPE_FILTER_GEOCODE).build();
                    break;
                case FilterTypes.Region:
                    filter = filter.setTypeFilter(placesNamespace.AutocompleteFilter.TYPE_FILTER_REGIONS).build();
                    break;
            }
            //console.dir(com.google.android.gms.location.places.Places);
            // var a = com.google.android.gms.location.places;
            // var b = a.Places();
            let client = com.google.android.gms.location.places.Places.getGeoDataClient(app.android.foregroundActivity, null);
            let predictionRequest = placesNamespace.GeoDataApi.getAutocompletePredictions(client, query, null, filter);
            let predictions = predictionRequest.await(60, java.util.concurrent.TimeUnit.SECONDS);
            let status = predictions.getStatus();
            if (!status.isSuccess()) reject(status.toString());
            let a = com.google.android.gms.common.data.DataBufferUtils.freezeAndClose(predictions);
            resolve(a);
        });
    }
}
