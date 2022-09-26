import {wordList} from "./word-list.js"

const searchWrapper = document.querySelector(".search-input")
const inputBox = searchWrapper.querySelector("input")
const suggestionList = searchWrapper.querySelector(".suggestion-list")

// let words = wordList

export function showSuggestions(words, guessedWord, incorrectLetters, correctLetters, misplacedWord) {
  const guess = new RegExp(guessedWord.join(""))
  
  console.log("guessed word: ", guessedWord)
  // console.log("misplaced word: ", misplacedWord)
  console.log("incorrect letters: ", incorrectLetters)
  // console.log("letters in wrong spot: ", correctLetters)

  // console.log(words[0][1])

  words = words.filter((word) => {
    return guess.test(word)
  })
  console.log("1)", words)

  // remove words that have the same incorrectly placed correct letters
  if (misplacedWord.length != 0) {
    for (let i = 0; i < misplacedWord.length; i++) {
      const misplaced = new RegExp(misplacedWord[i].join(""))
      words = words.filter((word) => {
        // console.log(word)
        // console.log(word, misplaced.test(word))
        if (misplaced.test(word)) {
          console.log("removed same incorrect: ", word)
        }
        return !misplaced.test(word)
      })
    }
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
    // if (stay == false) {
    //   console.log("incorrect letters: ", word, " contains: ", incorrectLetter)
    // }
    return stay
  })
  console.log("3)", words)

  // remove words that do not have the misplaced correct letters
  if (correctLetters.size != 0) {
    words = words.filter((word) => {
      let stay = true
      correctLetters.forEach((letter) => {
        // console.log(letter)
        if (!word.includes(letter)) {
          stay = false
        }
      })
      if (!stay) {
        // console.log("REMOVED: ", word)
      }
      return stay
    })
    console.log("4)", words)
  }

  console.log("new words: ", words)
  let newSuggestion = words.map((data) => {
    return data = "<li>" + data + "</li>"
  })

  console.log("new suggestions: ", newSuggestion)
  suggestionList.innerHTML = newSuggestion.join("")
  // showGraph(words)
}

export function showGraph(words, guessedWord, incorrectLetters, correctLetters, misplacedWord) {
  const letters = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  console.log(words)

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < 5; j++) {
      letters[words[i].charCodeAt(j) - 97] += 1
      // console.log(words[i].charCodeAt(j) - 97)
    }
  }

  let wordLetterFreq = []
  for (let i = 0; i < words.length; i++) {
    let value = 0
    for (let j = 0; j < 5; j++) {
      value += letters[words[i].charCodeAt(j) - 97]
    }
    wordLetterFreq.push([value, words[i]])
  }
  wordLetterFreq.sort((a, b) => {
    return b[0] - a[0]
  })

  let getWords = []
  wordLetterFreq.forEach((arr) => {
    // console.log(arr)
    getWords.push(arr[1])
  })
  // console.log(getWords)

  showSuggestions(getWords, guessedWord, incorrectLetters, correctLetters, misplacedWord)

  const chart = document.querySelector("#chart").getContext("2d")
  const letterChart = new Chart(chart, {
    animationEnabled: true,
    theme: "light1",
    type: "bar",
    data: {
      labels: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
               "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
      datasets: [{
        label: "frequency",
        data: letters
      }]
    }
  })
}