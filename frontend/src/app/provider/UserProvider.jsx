import React, { useEffect, useState } from "react";
import { getUserListInscription, getUsers } from "../api/userApi";
import { UserContext } from "../context/UserContext";

function UserProvider({ children }) {
  const [userListInscription, setUserListInscription] = useState([]);
  const [userList, setUserList] = useState([]);

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
    }
  };
  
  const fetchUserList = async () => {
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
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <UserContext.Provider
      value={{ userListInscription, userList, fetchUserListInscription }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
