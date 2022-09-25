import {wordList} from "./word-list.js"

const searchWrapper = document.querySelector(".search-input")
const inputBox = searchWrapper.querySelector("input")
const suggestionList = searchWrapper.querySelector(".suggestion-list")

let words = wordList

export function showSuggestions(guessedWord, incorrectLetters, correctLetters) {
  const guess = new RegExp(guessedWord)
  console.log(guessedWord)
  console.log(incorrectLetters)
  console.log(correctLetters)
  words = words.filter((data) => {
    return guess.test(data)
  })
  console.log(words)


  words.forEach((word) => {
    incorrectLetters.forEach((letter) => {
      console.log("word cannot have letter: ", letter)
      if (word.includes(letter)) {
        words.pop(word)
        console.log("deleted: ", word)
        return
      }
    })
    
  })

  words.forEach((word) => {
    // letters that are in the wrong spot 
    correctLetters.forEach((letter) => {
      console.log("checking for letter: ", letter)
      if (!word.includes(letter)) {
        console.log("removed: ", word)
        words.pop(word)
      }
    })
  })

  // words = words.filter((data) => {
    
  //   incorrectLetters.forEach((letter) => {
  //     // console.log("SET:")
  //     // console.log(letter)

  //     // return data.includes(letter)
  //     // console.log(!data.includes(letter))
  //     if (data.includes(letter)) {
  //       words.pop(data)
  //     }
  //   })
  //   // console.log(data, contains)
  //   // return !data.includes("a")
  // })
  console.log(words)
  words = words.map((data) => {
    return data = "<li>" + data + "</li>"
  })

  console.log(words)
  suggestionList.innerHTML = words.join("")
}

// showSuggestions("[a-zA-Z][a-zA-Z]a[a-zA-Z][a-zA-Z]")

// function showSuggestions(guessedWord) {
//   let words = wordList.filter((data) => {
//     return data.startsWith(guessedWord)
//   })
//   words = words.map((data) => {
//     return data = "<li>" + data + "</li>"
//   })
// }
