const gameContainer = document.getElementById("game");
let targetDivs = [];
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let counter = 0;
let lock = false;
// TODO: Implement this function!
function handleCardClick(event) {
  if(lock) return
  const target = event.target
  target.style.backgroundColor = target.className;
  counter++
  if(counter < 3){
    targetDivs.push(target)
    if(counter === 2){
      lock = true
    }
  }

  if(targetDivs.length === 2){
    setTimeout(()=>{
      checkMatch(targetDivs)
      counter = 0
      lock = false
      targetDivs.length = 0;
    },1000)
  }
}


function checkMatch(data){
  if(data[0].className === data[1].className){
    data[0].removeEventListener("click",handleCardClick)
    data[1].removeEventListener("click",handleCardClick)
  }else{
    data[0].style.backgroundColor = ""
    data[1].style.backgroundColor = ""
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
