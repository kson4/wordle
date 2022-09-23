import { inputLetter } from "./game-logic.js"

const tiles = document.querySelector(".tiles")
const gameTiles = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""]
]
gameTiles.forEach((gameTile, idx) => {
  const row = document.createElement("div")
  row.setAttribute("id", `r${idx}`)
  gameTile.forEach((column, cIdx) => {
    const tile = document.createElement("div")
    tile.setAttribute("id", `r${idx}c${cIdx}`)
    row.append(tile)
  })
  tiles.append(row)
})

document.addEventListener("keydown", (event) => {
  if (event.key >= "a" && event.key <= "z") {
    inputLetter(event.key)
  }
})

const keyboard = document.querySelector(".keyboard")
const keys = [
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", 
  "A", "S", "D", "F", "G","H","J","K","L", 
  "ENTER", "Z", "X", "C", "V", "B", "N", "M", "<<"
]
keys.forEach(key => {
  const button = document.createElement("button")
  button.textContent = key
  button.setAttribute("id", key)
  button.addEventListener("click", () => keyClicked(key))
  keyboard.appendChild(button)
})

function keyClicked(key) {
  console.log("clicked", key)
  inputLetter(key)
}