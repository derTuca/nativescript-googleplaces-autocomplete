# Nativescript Google Places Autocomplete

This plugin helps you retrieve autocomplete results programatically from the Google Places API using the native APIs for each platform

## Installation

```javascript
tns plugin add nativescript-googleplaces-autocomplete
```

Make sure to add your API key to AndroidManifest.xml for Android.

## Usage 

```javascript
    this.googleplacesAutocomplete = new GoogleplacesAutocomplete();
    this.googleplacesAutocomplete.init("apiKey"); // used for iOS
    this.googleplacesAutocomplete.get("query", PlaceTypes.City);
```

    
## License

Apache License Version 2.0, January 2004
