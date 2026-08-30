import React, { Children, useEffect, useState } from 'react'
import { getCour, getCourById } from '../api/courApi';
import { CourContext } from '../context/CourContext';

function CourProvider({children}) {
    const [cours, setCours] = useState([]);
    const [courDetail, setCourDetail] = useState([]);

    useEffect(() => {
        fetchCours();
        // fetchCourDetail();
    }, []);

    const fetchCours = async () => {
        try {
            const response = await getCour();
            setCours(response.data);
            
            console.log("Cours sélectionnés avec succès");
        } catch (error) {
            console.error("Erreur lors de la récuperation des cours :", error.response?.data);
        }
    };

    // const fetchCourDetail = async () => {
    //     try {
    //         const response = await getCourById();
    //         setCourDetail(response.data);

    //         console.log("Détails du cour sélectionnés avec succès");
    //     } catch (error) {
    //         console.error("Erreur lors de la récupération des détails cour :", error.response?.data);
    //     }
    // }
  return (
    <CourContext.Provider value={{cours, courDetail, setCours}}>
        {children}
    </CourContext.Provider>
  );
}

export default CourProvider