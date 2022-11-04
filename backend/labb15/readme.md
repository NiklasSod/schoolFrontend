Du ska i denna laborationsuppgift göra följande:

I den här uppgiften ska du bygga en webbserver med hjälp av express.js som levererar en webbplats till användarna. 
Här vill jag att du har en sida som visar todos likt den todo applikation vi gjorde i tidigare lektioner. 
Dina Todos ska sparas på din server i en .json fil. 
Ett tips är då att du måste läsa in hela din json fil, konvertera om det till ett JavaScripts objekt för att kunna göra dina ändringar och sedan skriva över hela din .json fil med ändringarna. 
Här behöver du då bygga ett api som han hjälpa dig att läsa / skriva data till din .json fil. 
I det här fallet räcker det att du kan:Hämta alla todos med en GETLägga till en todo med hjälp av en POSTExtra:Gör så man kan klar-markera en todo med hjälp av en PUT eller PATCH.

// npm run labb15