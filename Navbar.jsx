import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="bg-white text-blue-900">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-lg">Mini Stackoverflow</Link>
          <Link to="/tags" className="text-sm">Tags</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-3 py-1 rounded bg-blue-100 text-blue-900">Se connecter</Link>
          <Link to="/ask" className="px-3 py-1 rounded bg-blue-600 text-white">Poser une question</Link>
        </div>
      </div>
    </nav>
  )
}
