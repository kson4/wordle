import {wordList} from "./word-list.js"

const searchWrapper = document.querySelector(".search-input")
const inputBox = searchWrapper.querySelector("input")
const suggestionList = searchWrapper.querySelector(".suggestion-list")

let words = wordList

export function showSuggestions(guessedWord, incorrectLetters, correctLetters, misplacedWord) {
  const guess = new RegExp(guessedWord)
  const misplaced = new RegExp(misplacedWord)
  console.log(guessedWord)
  console.log(misplacedWord)
  // console.log("incorrect letters: ", incorrectLetters)
  // console.log("letters in wrong spot: ", correctLetters)
  

  words = words.filter((word) => {
    return guess.test(word)
  })
  console.log("1)", words)

  // remove incorrect letters
  words = words.filter((word) => {
    let stay = true
    incorrectLetters.forEach((letter) => {
      if (word.includes(letter)) {
        stay = false
      }
    })
    return stay
  })
  console.log("2)", words)

  // remove words that do not have the misplaced correct letters
  if (correctLetters.size != 0) {
    words = words.filter((word) => {
      let stay = false
      correctLetters.forEach((letter) => {
        console.log(letter)
        if (word.includes(letter)) {
          stay = true
        }
      })
      return stay
    })
    console.log("3)", words)
  }
  

  // remove words that have the same incorrectly placed correct letters
  words = words.filter((word) => {
    console.log("removed: ", word)
    return misplaced.test(word)
  })
  console.log("4)", words)

  console.log("new words: ", words)
  let newSuggestion = words.map((data) => {
    return data = "<li>" + data + "</li>"
  })

  console.log("new suggestions: ", newSuggestion)
  suggestionList.innerHTML = newSuggestion.join("")

}