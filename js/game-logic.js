let currentRow = 0
let currentColumn = 0

export function inputLetter(key) {
  document.querySelector(`#r${currentRow}c${currentColumn}`).textContent = key
  currentColumn += 1
}