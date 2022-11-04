import axios from 'axios'

const gasApi = axios.create({
  headers: { 
    // 'content-type': 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
  }	
})

const apiUrl = "https://script.google.com/macros/s/AKfycbzymBOzh7YAfMFIJkO0z0HKTYf-vgCbEf99TZCzs18z7Lufs9MotGXwvWuDczZGs_Dd/exec"

gasApi.fetch = () => {
  console.log('fetch!!!')
  return gasApi.get(apiUrl)
}

export default gasApi
