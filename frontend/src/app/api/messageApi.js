import API from "./api";

export const getMessages = () => API.get("/getMessage");

export const storeMessage = (data) => API.post("/storeMessage", data);

// Cette requête synchronise le statut lu avec le serveur quand une discussion est ouverte.
export const markConversationAsRead = (otherUserId) =>
	API.post(`/messages/${otherUserId}/read`);