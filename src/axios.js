import axios from "axios";

let api = new axios.create({
    "baseURL": "http://localhost:9999",
    headers: {
        "Content-type": "application/json"
    }
})

export default api;