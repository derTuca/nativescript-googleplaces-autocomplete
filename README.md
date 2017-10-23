# Nativescript Google Places Autocomplete

This plugin helps you retrieve autocomplete results programatically from the Google Places API using the native APIs for each platform

## (Optional) Prerequisites / Requirements

Describe the prerequisites that the user need to have installed before using your plugin. See [nativescript-firebase plugin](https://github.com/eddyverbruggen/nativescript-plugin-firebase) for example.

## Installation

```javascript
tns plugin add nativescript-googleplaces-autocomplete
```

Make sure to add your API key to AndroidManifest.xml for Android.

## Usage 

Describe any usage specifics for your plugin. Give examples for Android, iOS, Angular if needed. See [nativescript-drop-down](https://www.npmjs.com/package/nativescript-drop-down) for example.
	
	```javascript
      this.googleplacesAutocomplete = new GoogleplacesAutocomplete();
      this.googleplacesAutocomplete.init("apiKey"); // used for iOS
      this.googleplacesAutocomplete.get("query", PlaceTypes.City);
    ```)

    
## License

Apache License Version 2.0, January 2004
