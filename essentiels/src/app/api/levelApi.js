import API from "./api"

export const getLevel = () => {
    return API.get("/getLevel");
}