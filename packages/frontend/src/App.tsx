import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/main'

export const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
    </Routes>
  )
}
