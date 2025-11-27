// Pages/Users.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Awa123",
      reputation: 1250,
      questions: 12,
      answers: 45,
      joined: "2023-05-15",
      tags: ["react", "javascript", "html"]
    },
    {
      id: 2,
      name: "Fatou",
      reputation: 890,
      questions: 8,
      answers: 32,
      joined: "2023-08-22",
      tags: ["css", "tailwind", "frontend"]
    },
    {
      id: 3,
      name: "Doudou",
      reputation: 340,
      questions: 5,
      answers: 18,
      joined: "2024-01-10",
      tags: ["react", "next js", "javascript"]
    },
    {
      id: 4,
      name: "BackendMaster",
      reputation: 2100,
      questions: 25,
      answers: 67,
      joined: "2022-11-30",
      tags: ["laravel", "php", "api", "mysql"]
    },
    {
      id: 5,
      name: "PythonLover",
      reputation: 1560,
      questions: 18,
      answers: 42,
      joined: "2023-02-14",
      tags: ["django", "python", "postgresql"]
    },
    {
      id: 6,
      name: "WebDeveloper",
      reputation: 720,
      questions: 9,
      answers: 28,
      joined: "2023-10-05",
      tags: ["next js", "react", "typescript"]
    }
  ])

  const [sortBy, setSortBy] = useState('reputation') // 'reputation', 'questions', 'joined'

  const sortedUsers = [...users].sort((a, b) => {
    switch (sortBy) {
      case 'questions':
        return b.questions - a.questions
      case 'joined':
        return new Date(b.joined) - new Date(a.joined)
      case 'reputation':
      default:
        return b.reputation - a.reputation
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600 mt-2">
            Découvrez notre communauté de développeurs passionnés
          </p>
        </div>

        {/* Filtres et tris */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              {sortedUsers.length} utilisateur{sortedUsers.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="reputation">Réputation</option>
                <option value="questions">Questions</option>
                <option value="joined">Date d'inscription</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des utilisateurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedUsers.map(user => (
            <div key={user.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Informations utilisateur */}
                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/users/${user.id}`}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 truncate block"
                  >
                    {user.name}
                  </Link>
                  
                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold text-gray-900">{user.reputation}</span>
                      <span>réputation</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold text-gray-900">{user.questions}</span>
                      <span>questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold text-gray-900">{user.answers}</span>
                      <span>réponses</span>
                    </div>
                  </div>

                  {/* Tags populaires */}
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {user.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {user.tags.length > 3 && (
                        <span className="text-gray-500 text-xs">+{user.tags.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* Date d'inscription */}
                  <div className="mt-3 text-xs text-gray-500">
                    Inscrit le {new Date(user.joined).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* État vide */}
        {sortedUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
            <p className="text-gray-600">
              Aucun utilisateur ne correspond aux critères de recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}