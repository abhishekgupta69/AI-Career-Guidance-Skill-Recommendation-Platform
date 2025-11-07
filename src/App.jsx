import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProfilePage from './components/ProfilePage'
import DashboardPage from './components/DashboardPage'
import { sampleCareers } from './components/careerData'

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to='/profile' replace />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage careers={sampleCareers} />} />
        </Routes>
      </div>
    </div>
  )
}
