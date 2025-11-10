import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedVideos: [],
  addVideoToSavedVideos: () => {},
  removeVideoFromSavedVideos: () => {},
})

export default ThemeContext
