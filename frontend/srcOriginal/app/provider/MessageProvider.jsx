import React, { useEffect, useState } from "react";
import { MessageContext } from "../context/MessageContext";
import { getMessages } from "../api/messageApi";

function MessageProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await getMessages();
      setConversations(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des messages :",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <MessageContext.Provider value={{ conversations, fetchMessages, loading }}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;
