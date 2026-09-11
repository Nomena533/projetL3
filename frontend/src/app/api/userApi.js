// import { API } from "./api"

import API from "./api";

export const getUser = () => {
    return API.get("/profile");
};

export const getUserListInscription = (userId) => {
    return API.get(`/user/${userId}/userListInscription`);
};
