import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://vue-demos-a9f81-default-rtdb.firebaseio.com",
});

export default journalApi;