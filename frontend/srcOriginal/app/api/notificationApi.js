import API from "./api";

export const getNotification = () => {
    return API.get("/getNotification")
};

export const markNotificationAsRead = (id) => {
    return API.post(`/notification/${id}/read`);
}

export const markAllNotificationAsRead = () => {
    return API.post(`/notification/read`);
}