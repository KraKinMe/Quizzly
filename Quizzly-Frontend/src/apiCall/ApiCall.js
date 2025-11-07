import axios from "axios";

export default async function apiCall(topic){
const {data} = await axios.post("http://localhost:3000/quiz",topic);
return data;
}

