var GoogleplacesAutocomplete = require("nativescript-googleplaces-autocomplete").GoogleplacesAutocomplete;
var googleplacesAutocomplete = new GoogleplacesAutocomplete();

describe("greet function", function() {
    it("exists", function() {
        expect(googleplacesAutocomplete.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(googleplacesAutocomplete.greet()).toEqual("Hello, NS");
    });
});