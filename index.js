/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
for(const object of games) {
    // create a new div element, which will become the game card
    let gameCard = document.createElement("div");
    // add the class game-card to the list
    gameCard.classList.add("game-card");
    // set the inner HTML using a template literal to display some info 
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    gameCard.innerHTML = 
    `
    <h3>${object.name} </h3>
    <div>${object.description} </div>
    <h4>${object.goal} </h4>
    <img src="${object.img}" class="game-img" >;
    `;
    
    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
}

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
},0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
const contributionText = `${totalContributions.toLocaleString('en-US')}`; 
contributionsCard.appendChild(document.createTextNode(contributionText));

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((acc,game)=>{
    return acc + game.pledged;
},0)
// set inner HTML using template literal
const plesgedText = `$${totalPledged.toLocaleString('en-US')}`; 
raisedCard.appendChild(document.createTextNode(plesgedText));

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalNumGames = GAMES_JSON.reduce((acc, game)=>{
    return acc + 1
},0)
const numGamesTxt = `${totalNumGames.toLocaleString('en-US')}`; 
gamesCard.appendChild(document.createTextNode(numGamesTxt));

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
    let unfundedFilter = GAMES_JSON.filter((game)=>{
        return game.pledged < game.goal;
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedFilter);
}

  filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have met or exceeded their goal
    let fundedFilter = GAMES_JSON.filter((game)=>{
        return game.pledged > game.goal;
    });
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedFilter);
}
filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}
showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");
// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.reduce((acc, game)=>{
    return  game.pledged < game.goal ? acc + 1 : acc;
},0);
console.log(numUnfundedGames);
// create a string that explains the number of unfunded games using the ternary operator

const infoStr = `A total of ${plesgedText} has been raised for ${totalNumGames} games.Currently, 
 ${numUnfundedGames} game remains unfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const infoDiv = document.createElement("p");
let infoNode = document.createTextNode(infoStr);
descriptionContainer.appendChild(infoNode);
// document.body.appendChild(infoDiv);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

console.log("1st game is: "+ sortedGames[0].name);
console.log("2nd game is: "+ sortedGames[1].name);

// use destructuring and the spread operator to grab the first and second games
 let name1 = GAMES_JSON[0].name;
 let name2 = GAMES_JSON[1].name;
// create a new element to hold the name of the top pledge game, then append it to the correct element
let name1Node = document.createTextNode(name1);
firstGameContainer.appendChild(name1Node);
let name2Node = document.createTextNode(name2);
secondGameContainer.appendChild(name2Node);


// ==== bonus features ====
const inputField = document.getElementById("search");
function performSearch(e){
// console.log("text typed: "+ e.target.value );

 // Filter the array of strings
 var filtered = GAMES_JSON.filter((game) =>{
    let name = game.name.toLowerCase();
    return name.startsWith(e.target.value)? game : "";
  });



    if(filtered.length != 0){
        filtered.forEach(object => {
            let gameCard = document.createElement("div");
            gameCard.classList.add("game-card");
            gameCard.innerHTML = 
            `
            <h3>${object.name} </h3>
            <div>${object.description} </div>
            <h4>${object.goal} </h4>
            <img src="${object.img}" class="game-img" >;
            `;
             gamesContainer.appendChild(gameCard);
            
          });
    } else{
        let emptyContainer = document.createElement("div");
        emptyContainer.classList.add("emptyContainer");
        emptyContainer.innerHTML = 
    `
    <h3> No games found!    keep searching... </h3>
    `;
    gamesContainer.appendChild(emptyContainer);
    }

}

inputField.addEventListener("input", 
function(event){
    deleteChildElements(gamesContainer);
    performSearch(event);

})



const button = document.getElementById("scrollTopButton");

// When the user scrolls 60% of the way down the page, show the button
window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 70) {
    button.classList.add("visible");
    button.classList.remove("hidden");
  } else {
    button.classList.add("hidden");
    button.classList.remove("visible");
  }
};

// When the user clicks the button, scroll back to the top of the page
button.onclick = function() {
  document.body.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  }); // For Safari
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  }); // For Chrome, Firefox, IE, and Opera

}