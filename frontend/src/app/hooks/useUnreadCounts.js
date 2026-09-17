/**
 * TODO (backend) : remplacer ce hook "mock" par une vraie source de
 * données (NotificationContext existant, ou un appel à
 * app/api/notificationApi.js / app/api/messageApi.js).
 *
 * Il centralise les compteurs affichés dans les icônes du nav
 * (messages non lus, notifications non lues) pour les espaces
 * Élève / Professeur / Administrateur, ainsi qu'une liste des
 * dernières notifications pour le panneau déroulant.
 *
 * Forme attendue en sortie, à conserver pour ne pas casser les layouts :
 * {
 *   unreadMessages: number,
 *   unreadNotifications: number,
 *   notifications: { id, title, time }[]
 * }
 */
export default function useUnreadCounts() {
  // Valeurs par défaut à 0 / vide en attendant le branchement API.
  return {
    unreadMessages: 0,
    unreadNotifications: 0,
    notifications: [],
  };
}
