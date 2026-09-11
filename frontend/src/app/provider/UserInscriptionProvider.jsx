import React, { useEffect, useState } from "react";
import { getUserListInscription } from "../api/userApi";
import { UserInscriptionContext } from "../context/UserInscriptionContext";

function UserInscriptionProvider({ children }) {
  const [userListInscription, setUserListInscription] = useState([]);

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

  return (
    <UserInscriptionContext.Provider
      value={{ userListInscription, fetchUserListInscription }}
    >
      {children}
    </UserInscriptionContext.Provider>
  );
}

export default UserInscriptionProvider;
