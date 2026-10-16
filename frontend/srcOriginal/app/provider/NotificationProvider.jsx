import React, { useEffect, useState } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { getNotification } from "../api/notificationApi";

function NotificationProvider({ children }) {
  const [unreadNotification, setUnreadNotification] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(true);

  const fetchNotification = async () => {
    try {
      const response = await getNotification();
      setUnreadNotification(response.data.unread);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des notifications :",
        error.response?.data || error.message,
      );
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  return (
    <NotificationContext.Provider value={{ unreadNotification, unreadCount, fetchNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
