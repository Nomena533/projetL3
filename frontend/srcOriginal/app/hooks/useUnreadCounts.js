import { useMessage } from "./useMessage";

// Le layout réutilise ce hook pour afficher le total des messages non lus.
export default function useUnreadCounts() {
  const { conversations } = useMessage();

  // Chaque conversation fournit son compteur, ce qui évite de recompter les messages côté interface.
  const unreadMessages = conversations.reduce(
    (total, conversation) => total + (conversation.unreadCount || 0),
    0,
  );

  return {
    unreadMessages,
    unreadNotifications: 0,
    notifications: [],
  };
}
