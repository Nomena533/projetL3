import React, { useContext } from 'react'
import { PaiementContext } from '../context/PaiementContext';

export default function usePaiement() {
  return useContext(PaiementContext);
};
