import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import QuestionsList from './Pages/QuestionsList'
import AskQuestion from './Pages/AskQuestion'
import TagsList from './Pages/TagsList'
import TagQuestions from './Pages/TagQuestions'
import QuestionDetails from './Pages/QuestionDetails'
import Login from './Pages/Login'
import Register from './Pages/Register'
import NotFound from './Pages/Users'
import Navbar from './Components/common/Navbar'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <div>
      <Navbar />
      {/* Barre de recherche en dessous de la navbar */}
      <div className="bg-blue-600 py-4 shadow-md">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>
      <main className="py-8">
        <div className="app-container">
          <Routes>
            <Route path="/" element={<QuestionsList />} />
            <Route path="/ask" element={<AskQuestion />} />
            <Route path="/tags" element={<TagsList />} />
            <Route path="/tags/:tagName/questions" element={<TagQuestions />} />
            <Route path="/questions/:id" element={<QuestionDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}