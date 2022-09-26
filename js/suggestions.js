import {wordList} from "./word-list.js"

const searchWrapper = document.querySelector(".search-input")
const inputBox = searchWrapper.querySelector("input")
const suggestionList = searchWrapper.querySelector(".suggestion-list")

let words = wordList

export function showSuggestions(guessedWord, incorrectLetters, correctLetters, misplacedWord) {
  const guess = new RegExp(guessedWord)
  const misplaced = new RegExp(misplacedWord)
  console.log("guessed word: ", guessedWord)
  console.log("misplaced word: ", misplacedWord)
  console.log("incorrect letters: ", incorrectLetters)
  // console.log("letters in wrong spot: ", correctLetters)

  words = words.filter((word) => {
    return guess.test(word)
  })
  console.log("1)", words)
  // remove words that have the same incorrectly placed correct letters
  if (misplacedWord != "[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]") {
    words = words.filter((word) => {
      if (misplaced.test(word)) {
        console.log("removed same incorrect: ", word)
      }
      return !misplaced.test(word)
    })
    console.log("2)", words)
  }

  // remove incorrect letters
  words = words.filter((word) => {
    let stay = true
    let incorrectLetter = ""
    incorrectLetters.forEach((letter) => {
      if (word.includes(letter)) {
        stay = false
        incorrectLetter = letter
      }
    })
    if (stay == false) {
      console.log("incorrect letters: ", word, " contains: ", incorrectLetter)
    }
    return stay
  })
  console.log("3)", words)

  // // remove words that do not have the misplaced correct letters
  // if (correctLetters.size != 0) {
  //   words = words.filter((word) => {
  //     let stay = true
  //     correctLetters.forEach((letter) => {
  //       // console.log(letter)
  //       if (!word.includes(letter)) {
  //         stay = false
  //       }
  //     })
  //     if (!stay) {
  //       // console.log("REMOVED: ", word)
  //     }
  //     return stay
  //   })
  //   console.log("4)", words)
  // }

  console.log("new words: ", words)
  let newSuggestion = words.map((data) => {
    return data = "<li>" + data + "</li>"
  })

  console.log("new suggestions: ", newSuggestion)
  suggestionList.innerHTML = newSuggestion.join("")

}