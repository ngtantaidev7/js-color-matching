import { getPlayAgainButton,getTimerElement } from "./selectors.js"

function shuffle(arr){
  if(!Array.isArray(arr) || arr.length <= 2) return arr

  for(let i=arr.length-1; i>1; i--){
    const j = Math.floor(Math.random() * i)
    let temp=arr[i]
        arr[i]=arr[j]
        arr[j]=temp
  }
}

export const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor
  const colorList = []
  const hueList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome']
  // random "count" colors
  for(let i = 0; i < count; i++){
    const color = window.randomColor({
      luminosity: 'dark',
      hue: hueList[i % hueList.length],
    })

    colorList.push(color)
  }

  const fullColorList=[...colorList,...colorList]
  shuffle(fullColorList)
  
  return fullColorList
}

export function showPlayAgainButton(){
  const playAgainButton = getPlayAgainButton()
  if(playAgainButton) playAgainButton.classList.add('show')

}

export function hidePlayAgainButton(){
  const playAgainButton = getPlayAgainButton()
  if(playAgainButton) playAgainButton.classList.remove('show')
}

export function setTimerText(text){
  const timerELement = getTimerElement()
  if(timerELement) timerELement.textContent = text
  
}

export function createTimer({seconds, onChange, onFinish}){
  let intervalId = null

  function start(){
    clear();
    let currentSeconds = seconds
    intervalId = setInterval(() =>{
      onChange?.(currentSeconds) // if(onChange) onChange(currentSecond)
        currentSeconds--
        if(currentSeconds<0){
          clear()
          onFinish?.()
        }
    },1000)
}

  function clear(){
    clearInterval(intervalId)
  }


  return {
    start,
    clear,
  }
}
