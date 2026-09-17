import API from "./api";

export const getMessages = () => API.get("/getMessage");

export const storeMessage = (data) => API.post("/storeMessage", data);