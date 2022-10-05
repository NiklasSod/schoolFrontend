// Uppg A.1
const basketTeamFaze = [
  {name: 'Carl Blaese', age: 19, length: 203},
  {name: 'Peter Williams', age: 18, length: 204},
  {name: 'Danny Smith', age: 17, length: 198},
  {name: 'Chris Wilson', age: 17, length: 194},
  {name: 'Michael Brown', age: 18, length: 201},
  {name: 'Andrew Johnson', age: 20, length: 201},
  {name: 'Eric Miller', age: 18, length: 197},
  {name: 'Substitutive JohnDoe', age: 38, length: 164}
];

// Uppg A.2
const basketTeamLiquid = [
  {name: 'Henry Whittle', age: 18, length: 202},
  {name: 'Felix Ferguson', age: 19, length: 193},
  {name: 'Tobias Gordon', age: 18, length: 192},
  {name: 'Russell Banks', age: 19, length: 195}
];

// Uppg A.3
let allBbPlayers = [...basketTeamLiquid];
basketTeamFaze.map(person => {
  allBbPlayers.push(person);
});

// Uppg A.4
const bbCourtPlayers = allBbPlayers.filter(person => person.length > 200);

// Uppg A.5
bbCourtPlayers.forEach(person => {
  console.log(`My name is ${person.name} and I am longer than 2 meters! (${person.length}cm)`);
});

// Uppg S.1
let chooseFirstName = 3; // change number to test
let firstName = '';

switch (chooseFirstName) {
  case 0:
    firstName = 'Nisse';
    break;
  case 1:
    firstName = 'Per';
    break;
  case 2:
    firstName = 'Johannes';
    break;
  case 3:
    firstName = 'Joakim';
    break;
  default:
    firstName = 'Hans';
    break;
};

// Uppg S.2
let chooseLocation = 13; // change number to test
let location = '';

switch (true) {
  case 0:
    location = 'Umeå';
    break;
  case (chooseLocation > 0 && chooseLocation < 6):
    location = 'Stockholm';
    break;
  case (chooseLocation > 5 && chooseLocation < 11):
    location = 'Mora';
    break;
  case (chooseLocation > 10 && chooseLocation < 16):
    location = 'Västerås';
    break;
  case (chooseLocation > 15 && chooseLocation < 21):
    location = 'Göteborg';
    break;
  default:
    location = 'Malmö';
    break;
};
console.log(`My name is ${firstName}, but that can change! \nI live in ${location} but I plan on moving to...`)
