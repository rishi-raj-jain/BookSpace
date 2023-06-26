import { createContext, useContext } from 'react'

export const themes = ['light', 'dark']

export const PrefersContext = createContext({
  themeType: 'dark',
  switchTheme: () => {},
})

export const usePrefers = () => useContext(PrefersContext)
