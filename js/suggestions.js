import {wordList} from "./word-list.js"

const searchWrapper = document.querySelector(".search-input")
const inputBox = searchWrapper.querySelector("input")
const suggestionList = searchWrapper.querySelector(".suggestion-list")

// console.log(inputBox)
// console.log(wordList)

inputBox.onkeyup = (e) => {
  let userData = e.target.value
  console.log(userData)
  let words = []
  if (userData) {
    words = wordList.filter((data) => {
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase())
    })
    words = words.map((data) => {
      return data = "<li>" + data + "</li>"
    })
    console.log(words)
  }
  else {

  }
  showSuggestions(words)
}

function showSuggestions(list) {
  let listData
  if (!list.length) {
    userValue = inputBox.value
    listData = "<li>" + userValue + "</li>"
  }
  else {
    listData = list.join("")
  }
  suggestionList.innerHTML = listData
}