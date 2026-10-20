import React, { useEffect, useState } from "react";
import { getUserListInscription, getUsers } from "../api/userApi";
import { UserContext } from "../context/UserContext";
import useLoadState from "../hooks/useLoadState";

function UserProvider({ children }) {
  const [userListInscription, setUserListInscription] = useState([]);
  const [userList, setUserList] = useState([]);
  // `loading` / `error` concernent la liste des utilisateurs (chargée au démarrage de l'app).
  const { loading, error, track } = useLoadState();

  // Les inscriptions de l'élève dépendent de son id : l'état de chargement est géré par la page.
  const fetchUserListInscription = async (userId) => {
    try {
      const response = await getUserListInscription(userId);
      setUserListInscription(response.data);

      console.log(
        "Liste des inscription sélectionnés avec succès",
        response.data,
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des inscription :",
        error.response?.data,
      );
      throw error;
    }
  };

  const fetchUserList = () =>
    track(async () => {
      try {
        const response = await getUsers();
        setUserList(response.data);

        console.log(
          "Liste des utilisateurs sélectionnés avec succès",
          response.data,
        );
        return response.data;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error.response?.data,
        );
        throw error;
      }
    });

  useEffect(() => {
    fetchUserList().catch(() => {});
  }, []);

  // Exposer le rechargement permet aux modifications de profil d'actualiser les fiches publiques.
  return (
    <UserContext.Provider
      value={{
        userListInscription,
        userList,
        loading,
        error,
        fetchUserListInscription,
        fetchUserList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
