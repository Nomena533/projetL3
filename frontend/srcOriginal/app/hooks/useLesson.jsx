import React, { useContext } from 'react'
import { LessonContext } from '../context/LessonContext';

export default function useLesson() {
  return useContext(LessonContext);
};
