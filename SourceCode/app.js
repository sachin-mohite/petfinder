var petfinder = require("petfinder").petfinder;

// Create a new `petfinder` object using our API key.
var pf = new petfinder("3a62ece31719a64dcf6726980917d7ad");

// Find 10 senior dogs in the 94089 (Sunnyvale, CA) area.
// http://api.petfinder.com/pet.find?format=json&key=3a62ece31719a64dcf6726980917d7ad&animal=dog&location=94089&age=senior&count=10
pf.pet.find(94089, {"age":"senior", "count":10}, function (data) {
    console.log("get by location:");
    // Loop over the array of pets and display their id/name/sex/age.
    data.petfinder.pets.pet.forEach(nameSexAge);
});

// Get a pet by its numeric id.
// http://api.petfinder.com/pet.get?format=json&key=3a62ece31719a64dcf6726980917d7ad&id=24395698
pf.pet.get(24395698, function (data) {
    console.log("get by id:");
    nameSexAge(data.petfinder.pet);
});

// Get a random dog.
// http://api.petfinder.com/pet.getRandom?format=json&key=3a62ece31719a64dcf6726980917d7ad&animal=dog&output=basic
pf.pet.getRandom(function (data) {
    console.log("get random dog:");
    nameSexAge(data.petfinder.pet);
});

// Get a list of dog breeds.
// http://api.petfinder.com/breed.list?format=json&key=3a62ece31719a64dcf6726980917d7ad&animal=dog
pf.breed.list(function (data) {
    var breeds = data.petfinder.breeds.breed;
    // Iterate over the array of breeds and remove that nested `$t` variable.
    breeds = breeds.map(function (breed) {
        return breed.$t;
    });
    console.log("get list of breeds:");
    console.log("\t", breeds.slice(0, 5).join(", "));
});

function nameSexAge(data) {
    console.log("\t[%d] %s/%s/%s", data.id.$t, data.name.$t, data.sex.$t, data.age.$t);
}