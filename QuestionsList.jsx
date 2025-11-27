// Pages/QuestionsList.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function QuestionsList() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "Comment installer React ?",
      description: "Je veux apprendre React mais je ne sais pas par où commencer. Quelles sont les étapes pour installer React sur mon ordinateur ?",
      votes: 5,
      answers: 2,
      views: 120,
      tags: ["react", "javascript", "frontend"],
      author: "Astou123",
      date: "2024-01-15",
      answered: true
    },
    {
      id: 2,
      title: "Problème with Tailwind",
      description: "Mon css ne s applique pas correctement avec Tailwind CSS. Les classes ne semblent pas fonctionner.",
      votes: 3,
      answers: 0,
      views: 45,
      tags: ["tailwind", "css", "frontend"],
      author: "MarieDev",
      date: "2024-01-16",
      answered: false
    },
    {
      id: 3,
      title: "Next.js vs React : quelle différence ?",
      description: "Je débute en React et je me demande quelle est la différence entre Next.js et React. Lequel choisir pour mon projet ?",
      votes: 8,
      answers: 4,
      views: 210,
      tags: ["next js", "react", "framework", "javascript"],
      author: "Doudou",
      date: "2024-01-14",
      answered: true
    },
    {
      id: 4,
      title: "Comment créer une API REST avec Laravel ?",
      description: "Je souhaite créer une API RESTful pour mon application mobile. Quelles sont les meilleures pratiques avec Laravel ?",
      votes: 12,
      answers: 3,
      views: 185,
      tags: ["laravel", "php", "api", "backend"],
      author: "BackendMaster",
      date: "2024-01-13",
      answered: true
    },
    {
      id: 5,
      title: "Django ORM - problème de relations ManyToMany",
      description: "J'ai des difficultés avec les relations ManyToMany dans Django. Les objets ne se sauvegardent pas correctement.",
      votes: 6,
      answers: 2,
      views: 95,
      tags: ["django", "python", "orm", "database"],
      author: "PythonLover",
      date: "2024-01-17",
      answered: false
    },
    {
      id: 6,
      title: "Next.js Server Side Rendering ne fonctionne pas",
      description: "Le SSR de Next.js ne rend pas mes données côté serveur. La page reste blanche jusqu'au chargement client.",
      votes: 4,
      answers: 1,
      views: 78,
      tags: ["next js", "ssr", "react", "javascript"],
      author: "WebDeveloper",
      date: "2024-01-16",
      answered: false
    },
    {
      id: 7,
      title: "Laravel Eloquent relations complexes",
      description: "Comment créer des relations Eloquent avancées avec des conditions where et des jointures personnalisées ?",
      votes: 9,
      answers: 2,
      views: 134,
      tags: ["laravel", "eloquent", "php", "database"],
      author: "LaravelFan",
      date: "2024-01-12",
      answered: true
    },
    {
      id: 8,
      title: "Django deployment sur Heroku - erreurs static files",
      description: "Problème avec les fichiers statiques lors du déploiement Django sur Heroku. Les CSS et JS ne chargent pas.",
      votes: 7,
      answers: 3,
      views: 167,
      tags: ["django", "python", "heroku", "deployment"],
      author: "DevOpsNewbie",
      date: "2024-01-15",
      answered: true
    }
  ])

  const [filter, setFilter] = useState('all') // 'all', 'answered', 'unanswered'
  const [sortBy, setSortBy] = useState('newest') // 'newest', 'votes', 'views'

  const filteredAndSortedQuestions = questions
    .filter(question => {
      if (filter === 'answered') return question.answered
      if (filter === 'unanswered') return !question.answered
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.votes - a.votes
        case 'views':
          return b.views - a.views
        case 'newest':
        default:
          return new Date(b.date) - new Date(a.date)
      }
    })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Toutes les questions</h1>
            <p className="text-gray-600 mt-2">
              {filteredAndSortedQuestions.length} question{filteredAndSortedQuestions.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            to="/ask"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Poser une question
          </Link>
        </div>

        {/* Filtres et tris */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Toutes
              </button>
              <button
                onClick={() => setFilter('answered')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'answered'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Répondues
              </button>
              <button
                onClick={() => setFilter('unanswered')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'unanswered'
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sans réponse
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Plus récent</option>
                <option value="votes">Votes</option>
                <option value="views">Vues</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des questions */}
        <div className="space-y-4">
          {filteredAndSortedQuestions.map(question => (
            <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Stats */}
                  <div className="flex md:flex-col items-start space-x-4 md:space-x-0 md:space-y-2 text-center min-w-20">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold text-gray-900">{question.votes}</span>
                      <span className="text-xs text-gray-500">votes</span>
                    </div>
                    <div className={`flex flex-col items-center px-2 py-1 rounded ${
                      question.answered 
                        ? 'bg-green-100 text-green-800 border border-green-300' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      <span className="text-lg font-semibold">{question.answers}</span>
                      <span className="text-xs">réponses</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-semibold text-gray-900">{question.views}</span>
                      <span className="text-xs text-gray-500">vues</span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex-1">
                    <Link 
                      to={`/questions/${question.id}`}
                      className="text-xl font-medium text-blue-600 hover:text-blue-800 line-clamp-2"
                    >
                      {question.title}
                    </Link>
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {question.description}
                    </p>
                    
                    {/* Tags et métadonnées */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 space-y-2 sm:space-y-0">
                      <div className="flex flex-wrap gap-2">
                        {question.tags.map(tag => (
                          <Link
                            key={tag}
                            to={`/tags/${tag}/questions`}
                            className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-blue-600">{question.author}</span>
                        <span className="mx-1">•</span>
                        <span>posée le {new Date(question.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination (optionnel) */}
        {filteredAndSortedQuestions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">?</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune question trouvée</h3>
            <p className="text-gray-600 mb-4">
              {filter !== 'all' 
                ? `Aucune question ${filter === 'answered' ? 'répondue' : 'sans réponse'} pour le moment.`
                : 'Aucune question disponible pour le moment.'
              }
            </p>
            <Link
              to="/ask"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Poser la première question
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}