import API from "./api";

export const getMessages = () => {
	return API.get("/getMessage")
};

export const storeMessage = (data) => {
	return API.post("/storeMessage", data)
};

// Cette requête synchronise le statut lu avec le serveur quand une discussion est ouverte.
export const markConversationAsRead = (otherUserId) => {
	return API.post(`/messages/${otherUserId}/read`);
}