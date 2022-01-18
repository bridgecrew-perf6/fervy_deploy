import axios from "axios";

let api = new axios.create({
    "baseURL": "https://radiant-mountain-23167.herokuapp.com",
    headers: {
        "Content-type": "application/json"
    }
})

export default api;