// 1
let nameArray = [
  "Kalle", "Sara", "Stefan", "Klara", "Pelle"
];
console.log("Uppgift 1:");
console.log("*** Array skapad ***");
console.log("nameArray = " + nameArray);

// 2
console.log("\nUppgift 2:");
console.log("Ta bort den sista posten i din array.");
nameArray.pop();
console.log(nameArray); // "Kalle", "Sara", "Stefan", "Klara"

// 3
console.log("\nUppgift 3:");
console.log("Ändra namnet på plats 2 (i arrayen)");
nameArray.splice(1, 1, "Veronica");
console.log(nameArray); // "Kalle", "Veronica", "Stefan", "Klara"

// 4
console.log("\nUppgift 4:");
console.log("Lägg till 'Joakim' som ett namn i din array.");
nameArray.push("Joakim");
console.log(nameArray); // "Kalle", "Veronica", "Stefan", "Klara", "Joakim"

// 5
console.log("\nUppgift 5:");
console.log("Sortera arrayen i bokstavsordning.");
nameArray.sort();
console.log(nameArray); // "Joakim", "Kalle", "Klara", "Stefan", "Veronica"

// 6
console.log("\nUppgift 6:");
console.log("Ta reda på vilken index plats 'Joakim' har.");
console.log("Joakim har index plats " + nameArray.indexOf("Joakim") + " i arrayen."); // 0

// 7
console.log("\nUppgift 7:");
console.log("Ta bort 'Joakim' ur arrayen");
const remove = nameArray.indexOf("Joakim");
// nessesary if-check, if "Joakim" is not in array, last item will get removed
if (remove > -1) {
  nameArray.splice(remove, 1);
}
console.log(nameArray); // "Kalle", "Klara", "Stefan", "Veronica"

// 8
console.log("\nUppgift 8:");
console.log("Loopa igenom din array och logga varje namn i consolen.");
nameArray.forEach(item => console.log(item));