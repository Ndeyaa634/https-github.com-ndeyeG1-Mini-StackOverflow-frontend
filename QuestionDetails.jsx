// Pages/QuestionDetails.jsx
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function QuestionDetails() {
  const { id } = useParams()
  const [questions] = useState([
    {
      id: 1,
      title: "Comment installer React ?",
      
      details: "Je veux apprendre React mais je ne sais pas par où commencer. Quelles sont les étapes pour installer React sur mon ordinateur ? J'ai déjà Node.js d'installé mais je ne comprends pas la différence entre Create React App et Vite.",
      votes: 5,
      answers: [
        {
          id: 1,
          content: "Pour installer React, je te recommande d'utiliser Create React App. Tape simplement dans ton terminal : `npx create-react-app mon-projet` puis `cd mon-projet` et `npm start`. C'est la méthode la plus simple pour débuter.",
          author: "ReactExpert",
          votes: 3,
          isBest: false,
          comments: [
            { id: 1, author: "Débutant", content: "Merci pour cette réponse claire !", date: "2024-01-15" }
          ],
          date: "2024-01-15"
        },
        {
          id: 2,
          content: "Je préfère personnellement Vite qui est plus rapide : `npm create vite@latest mon-projet -- --template react` puis `npm install` et `npm run dev`.",
          author: "DevModern",
          votes: 5,
          isBest: true,
          comments: [],
          date: "2024-01-16"
        }
      ],
      views: 120,
      tags: ["react", "javascript", "frontend"],
      author: "Jean123",
      date: "2024-01-15",
      comments: [
        { id: 1, author: "Curieux", content: "As-tu essayé avec npm ?", date: "2024-01-15" }
      ]
    }
  ])

  const [newAnswer, setNewAnswer] = useState('')
  const [newComment, setNewComment] = useState({})
  const [currentUser] = useState("CurrentUser") // Simuler un utilisateur connecté

  const question = questions.find(q => q.id === parseInt(id))

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Question non trouvée</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              Retour aux questions
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleVoteQuestion = (type) => {
    console.log(`Vote ${type} sur la question ${question.id}`)
    // Ici vous ajouterez la logique API
  }

  const handleVoteAnswer = (answerId, type) => {
    console.log(`Vote ${type} sur la réponse ${answerId}`)
    // Ici vous ajouterez la logique API
  }

  const handleAddAnswer = (e) => {
    e.preventDefault()
    if (!newAnswer.trim()) return

    const newAnswerObj = {
      id: Date.now(),
      content: newAnswer,
      author: currentUser,
      votes: 0,
      isBest: false,
      comments: [],
      date: new Date().toISOString().split('T')[0]
    }

    console.log('Nouvelle réponse:', newAnswerObj)
    setNewAnswer('')
    // Ici vous ajouterez la logique API
  }

  const handleAddComment = (answerId, e) => {
    e.preventDefault()
    const commentText = newComment[answerId]
    if (!commentText?.trim()) return

    const newCommentObj = {
      id: Date.now(),
      author: currentUser,
      content: commentText,
      date: new Date().toISOString().split('T')[0]
    }

    console.log(`Nouveau commentaire pour la réponse ${answerId}:`, newCommentObj)
    setNewComment({ ...newComment, [answerId]: '' })
    // Ici vous ajouterez la logique API
  }

  const handleMarkBestAnswer = (answerId) => {
    console.log(`Marquer la réponse ${answerId} comme meilleure réponse`)
    // Ici vous ajouterez la logique API
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Retour aux questions
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>Posée le {new Date(question.date).toLocaleDateString('fr-FR')}</span>
            <span>•</span>
            <span>{question.views} vues</span>
            <span>•</span>
            <span>{question.answers.length} réponse{question.answers.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-9 space-y-6">
            {/* Question */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex gap-6">
                  {/* Votes de la question */}
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      onClick={() => handleVoteQuestion('up')}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <svg className="w-6 h-6 text-gray-500 hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <span className="text-xl font-semibold text-gray-900">{question.votes}</span>
                    <button
                      onClick={() => handleVoteQuestion('down')}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                      <svg className="w-6 h-6 text-gray-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Contenu de la question */}
                  <div className="flex-1">
                    <div className="prose max-w-none mb-6">
                      <p className="text-gray-700 whitespace-pre-line">{question.details}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map(tag => (
                        <Link
                          key={tag}
                          to={`/tags/${tag}/questions`}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>

                    {/* Auteur */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        <span>Posée par </span>
                        <span className="font-medium text-blue-600">{question.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Réponses */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {question.answers.length} Réponse{question.answers.length !== 1 ? 's' : ''}
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {question.answers.map(answer => (
                  <div key={answer.id} className={`p-6 ${answer.isBest ? 'bg-green-50 border-l-4 border-green-500' : ''}`}>
                    <div className="flex gap-6">
                      {/* Votes de la réponse */}
                      <div className="flex flex-col items-center space-y-2">
                        <button
                          onClick={() => handleVoteAnswer(answer.id, 'up')}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                        >
                          <svg className="w-6 h-6 text-gray-500 hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <span className="text-xl font-semibold text-gray-900">{answer.votes}</span>
                        <button
                          onClick={() => handleVoteAnswer(answer.id, 'down')}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                        >
                          <svg className="w-6 h-6 text-gray-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {/* Marquer comme meilleure réponse */}
                        {question.author === currentUser && !answer.isBest && (
                          <button
                            onClick={() => handleMarkBestAnswer(answer.id)}
                            className="mt-2 p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
                            title="Marquer comme meilleure réponse"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        )}
                        
                        {/* Meilleure réponse badge */}
                        {answer.isBest && (
                          <div className="mt-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                            ✓ Meilleure
                          </div>
                        )}
                      </div>

                      {/* Contenu de la réponse */}
                      <div className="flex-1">
                        <div className="prose max-w-none mb-4">
                          <p className="text-gray-700 whitespace-pre-line">{answer.content}</p>
                        </div>

                        {/* Commentaires existants */}
                        {answer.comments.length > 0 && (
                          <div className="ml-6 border-l-2 border-gray-200 pl-4 space-y-3 mb-4">
                            {answer.comments.map(comment => (
                              <div key={comment.id} className="text-sm text-gray-600">
                                <p>{comment.content}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="font-medium text-blue-600">{comment.author}</span>
                                  <span>•</span>
                                  <span>{new Date(comment.date).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Formulaire d'ajout de commentaire */}
                        <div className="ml-6">
                          <form onSubmit={(e) => handleAddComment(answer.id, e)} className="flex gap-2">
                            <input
                              type="text"
                              value={newComment[answer.id] || ''}
                              onChange={(e) => setNewComment({ ...newComment, [answer.id]: e.target.value })}
                              placeholder="Ajouter un commentaire..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm transition-colors"
                            >
                              Commenter
                            </button>
                          </form>
                        </div>

                        {/* Auteur et date */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                          <div className="text-sm text-gray-600">
                            <span>Répondu par </span>
                            <span className="font-medium text-blue-600">{answer.author}</span>
                            <span className="mx-1">•</span>
                            <span>{new Date(answer.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire de réponse */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Votre réponse</h3>
                <form onSubmit={handleAddAnswer}>
                  <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder="Rédigez votre réponse ici..."
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                    >
                      Publier votre réponse
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Statistiques</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vues</span>
                  <span className="font-semibold">{question.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Votes</span>
                  <span className="font-semibold">{question.votes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Réponses</span>
                  <span className="font-semibold">{question.answers.length}</span>
                </div>
              </div>
            </div>

            {/* Tags associés */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Tags associés</h3>
              <div className="flex flex-wrap gap-2">
                {question.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/tags/${tag}/questions`}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}