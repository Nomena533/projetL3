import React, { useEffect, useState } from "react";
import { MessageContext } from "../context/MessageContext";
import { getMessages } from "../api/messageApi";
import useLoadState from "../hooks/useLoadState";

function MessageProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const { loading, error, track } = useLoadState();

  const fetchMessages = () =>
    track(async () => {
      try {
        const response = await getMessages();
        setConversations(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des messages :",
          error.response?.data || error.message,
        );
        throw error;
      }
    });

  useEffect(() => {
    fetchMessages().catch(() => {});
  }, []);

  return (
    <MessageContext.Provider value={{ conversations, fetchMessages, loading, error }}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;
