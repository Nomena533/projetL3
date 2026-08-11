import  API  from "./api"

export const getRoles = () => {
    return API.get("/getRoles");
}