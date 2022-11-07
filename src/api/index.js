import axios from 'axios'

const gasApi = axios.create({
  headers: { 
    'content-type': 'application/x-www-form-urlencoded',
  }	
})

const apiUrl = "https://script.google.com/macros/s/AKfycbzymBOzh7YAfMFIJkO0z0HKTYf-vgCbEf99TZCzs18z7Lufs9MotGXwvWuDczZGs_Dd/exec"

const fetch_monster = () => {
  console.log("fetch!")
  return gasApi.get(apiUrl)
}

const update = (data) => {
  console.log("update!")
  fetch(apiUrl, {
    "method": "POST",
    "mode": "no-cors",
    "Content-Type": "application/x-www-form-urlencoded",
    "body": JSON.stringify(data)
  })
}

export default {
  fetch_monster,
  update
}
