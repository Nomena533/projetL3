import React, { Children } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function ThemeProvider(children) {
  return (
    <ThemeContext.Provider>{children}</ThemeContext.Provider>
  )
}

export default ThemeProvider