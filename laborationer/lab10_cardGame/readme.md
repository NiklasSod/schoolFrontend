--- Laboration 10: Deck of Cards

Deck of Cards API låter oss dra kort från en eller flera kortlekar. 
I response body så får man både vilket värde kortet har (suit och value) samt en URL till en bild på det dragna kortet. 
Dokumentation: http://deckofcardsapi.com/
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 

Skriv en sida som visar ett kort i taget när användaren klickar på en knapp. 

Skapa en <button></button>.
Skapa en <div></div> där bilden på kortet ska skivas ut. 

1. Skriv en JS-fil: 
2. Använd denna URI för fetchen:"https://deckofcardsapi.com/api/deck/new/draw/?count=1"
3. Kolla i dokumentationen för att se hur du ska plocka ut URL:en till bilden på kortet från data.
4. Använd createElement, setAttribute, innerHTML och appendChild för att skapa ett image-element, sätta dess src-attribut, nollställa div-en och lägga till image-elementet till den.

Lägg till en eventListener som lyssnar på knappen och kör ovanstående funktion vid klick.

## Extra
Bygg ett kortspel :) Tag hjälp av dokumentationen för API:et. 
Ni väljer själv vad ni bygger. Ett Blackjack-spel kanske? 