import React, { useContext } from 'react'
import { InscriptionContext } from '../context/InscriptionContext';

export default function useInscription() {
  return useContext(InscriptionContext);
}
