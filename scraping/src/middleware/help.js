const axios = require('axios')
const x =async ()=> {
const response=await axios.get()
if (response){
    console.log(response.data)
}
}