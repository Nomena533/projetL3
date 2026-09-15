// import { API } from "./api"

import API from "./api";

export const getUsers = () => {
    return API.get("/getUsers");
};

export const getUserProfile = () => {
    return API.get("/profile");
};

export const getUserListInscription = (userId) => {
    return API.get(`/user/${userId}/userListInscription`);
};
