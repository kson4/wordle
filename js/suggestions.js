import {wordList} from "./word-list.js"

const searchWrapper = document.querySelector(".search-input")
const inputBox = searchWrapper.querySelector("input")
const suggestionList = searchWrapper.querySelector(".suggestion-list")

let words = wordList

export function showSuggestions(guessedWord, incorrectLetters, correctLetters) {
  const guess = new RegExp(guessedWord)
  console.log(guessedWord)
  console.log("incorrect letters: ", incorrectLetters)
  console.log("letters in wrong spot: ", correctLetters)


  words = words.filter((word) => {
    return guess.test(word)
  })
  // console.log(words)

  // remove incorrect letters
  words = words.filter((word) => {
    let stay = true
    incorrectLetters.forEach((letter) => {
      if (word.includes(letter)) {
        stay = false
        return
      }
    })
    return stay
  })

  // remove words that do not have the misplaced correct letters
  words = words.filter((word) => {
    let stay = false
    correctLetters.forEach((letter) => {
      if (word.includes(letter)) {
        stay = true
        return
      }
    })
    return stay
  })


  console.log("new words: ", words)
  let newSuggestion = words.map((data) => {
    return data = "<li>" + data + "</li>"
  })

  console.log("new suggestions: ", newSuggestion)
  suggestionList.innerHTML = newSuggestion.join("")

}