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
  gameTiles.forEach((column, cIdx) => {
    const tile = document.createElement("div")
    tile.setAttribute("id", `r${idx}c${cIdx}`)
    row.append(tile)
  })
  tiles.append(row)
})

const keyboard = document.querySelector(".keyboard")
const keys = [
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", 
  "A", "S", "D", "F", "G","H","J","K","L", 
  "ENTER", "Z", "X", "C", "V", "B", "N", "M", "<<"
]
keys.forEach(key => {
  const button = document.createElement("button")
  button.innerHTML = key
  button.setAttribute("id", key)
  button.addEventListener("click", keyClicked)
  keyboard.appendChild(button)
})

function keyClicked() {
  console.log("clicked")
}