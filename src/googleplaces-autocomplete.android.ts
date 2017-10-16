import { AutocompletePrediction } from './autocomplete-prediction';
import { Common } from './googleplaces-autocomplete.common';
import * as app from "tns-core-modules/application";
import { isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
import { FilterTypes } from './filter-types';
declare var com: any;


export class GoogleplacesAutocomplete {
    init(key: string) {
        // init must exist for the iOS version, is useless on Android
    }
    get(query: string, filterType: FilterTypes): Promise<AutocompletePrediction[]> {
        if (!isEnabled()) {
            enableLocationRequest();
        }
        return new Promise((resolve, reject) => {
            getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).then(loc => {
                let places = com.google.android.gms.location.places;
                let model = com.google.android.gms.maps.model;
                let tasks = com.google.android.gms.tasks;
                    let filter = new places.AutocompleteFilter.Builder();
                    let bounds = new model.LatLngBounds.Builder().include(new model.LatLng(loc.latitude, loc.longitude)).build();
                    switch (filterType) {
                        case FilterTypes.Address:
                            filter = filter.setTypeFilter(places.AutocompleteFilter.TYPE_FILTER_ADDRESS).build();
                            break;
                        case FilterTypes.City:
                            filter = filter.setTypeFilter(places.AutocompleteFilter.TYPE_FILTER_CITIES).build();
                            break;
                        case FilterTypes.Establishment:
                            filter = filter.setTypeFilter(places.AutocompleteFilter.TYPE_FILTER_ESTABLISHMENT).build();
                            break;
                        case FilterTypes.NoFilter:
                            filter = filter.setTypeFilter(places.AutocompleteFilter.TYPE_FILTER_NONE).build();
                            break;
                        case FilterTypes.Geocode:
                            filter = filter.setTypeFilter(places.AutocompleteFilter.TYPE_FILTER_GEOCODE).build();
                            break;
                        case FilterTypes.Region:
                            filter = filter.setTypeFilter(places.AutocompleteFilter.TYPE_FILTER_REGIONS).build();
                            break;
                    }
                    let client = places.Places.getGeoDataClient(app.android.foregroundActivity, null);
                    let predictionRequest = client.getAutocompletePredictions(query, bounds, filter);
                    let predictions = predictionRequest.addOnSuccessListener(new tasks.OnSuccessListener({
                        onSuccess: (task) => {
                            let buffer = task.getResult();
                            let response: AutocompletePrediction[] = [];
                            for(let i = 0; i < buffer.getCount(); i++) {
                                let obj = new AutocompletePrediction();
                                let r = buffer.get(i);
                                obj.id = r.getPlaceId();
                                obj.prediction = r.getFullText(null);
                                response.push(obj);
                            }
                            buffer.release();
                            resolve(response);
                        }
                    })).addOnFailureListener(new tasks.OnFailureListener({
                        onFailure: e => {
                            reject(e);
                        }
                    }));
            }).catch(e1 => {
                reject(e1);
            });
        });

    }
}
