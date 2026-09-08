import React, { useContext } from 'react'
import { CourContext } from '../context/CourContext'

export default function useGetCour() {
  return useContext(CourContext);
};
