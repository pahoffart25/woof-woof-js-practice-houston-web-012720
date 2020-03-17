document.addEventListener("DOMContentLoaded", () =>{
const dogBar = document.querySelector("div#dog-bar")
const dogStuff = document.querySelector('div#dog-info')
const button = document.querySelector("button#good-dog-filter")
fetchdogs()


button.addEventListener("click", () => {
  if(button.innerText == "Filter good dogs: ON"){
    button.innerText = "Filter good dogs: OFF"
    fetchdogs()
  }else{
  button.innerText = "Filter good dogs: ON"
  fetchdogs()
  }
})


function fetchdogs() {
    fetch("http://localhost:3000/pups")
      .then(res => res.json())
      .then(dogs => addDogs(dogs))
  }

  function addDogs(dogs){
      dogBar.innerHTML = ""
      dogs.forEach(dog => {
        if (display().includes(dog.isGoodDog)){
          span = document.createElement("span")
          span.innerText = dog.name
          dogBar.append(span)
          span.addEventListener("click", () => displayDog(dog) )
        }
      })
  }

  function display(){
    if (button.innerText == "Filter good dogs: ON"){
      return [true]
    }else{
      return [false]
    }
  }

  function displayDog(dog){
    dogStuff.innerHTML =""
    h2 = document.createElement("h2")
    h2.innerText = dog.name
    img = document.createElement("img")
    img.src = dog.image
    btn = document.createElement("button")
    dog.isGoodDog? btn.innerText = "Bad Dog" : btn.innerText = "Good Dog" 
    dogStuff.append(h2, img, btn)
    btn.addEventListener("click", () => {
      params = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({

          "isGoodDog": !dog.isGoodDog
        })
      }
      fetch(`http://localhost:3000/pups/${dog.id}`, params)
        .then(btn.innerText == "Bad Dog" ? btn.innerText = "Good Dog"  : btn.innerText = "Bad Dog")
        .then(fetchdogs())
      
    })
  }
})
  
