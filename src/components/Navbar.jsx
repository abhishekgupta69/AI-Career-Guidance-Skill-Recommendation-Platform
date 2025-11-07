import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(){
  const loc = useLocation()
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">AI Career Guidance</h1>
          <p className="text-sm text-slate-500">Profile & Dashboard — frontend only</p>
        </div>
        <nav className="flex gap-3 items-center">
          <Link className={`px-3 py-2 rounded ${loc.pathname === '/profile' ? 'bg-slate-100' : 'hover:bg-slate-50'}`} to="/profile">Profile</Link>
          <Link className={`px-3 py-2 rounded ${loc.pathname === '/dashboard' ? 'bg-slate-100' : 'hover:bg-slate-50'}`} to="/dashboard">Dashboard</Link>
        </nav>
      </div>
    </header>
  )
}
