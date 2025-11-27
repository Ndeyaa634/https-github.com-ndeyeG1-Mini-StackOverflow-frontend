// Pages/AskQuestion.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AskQuestion() {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    tags: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Effacer l'erreur du champ quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre de la question est requis'
    } else if (formData.title.length < 10) {
      newErrors.title = 'Le titre doit contenir au moins 10 caractères'
    } else if (formData.title.length > 150) {
      newErrors.title = 'Le titre ne peut pas dépasser 150 caractères'
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Veuillez détailler votre question'
    } else if (formData.details.length < 20) {
      newErrors.details = 'Les détails doivent contenir au moins 20 caractères'
    }

    if (!formData.tags.trim()) {
      newErrors.tags = 'Veuillez ajouter au moins un tag'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Ici vous ajouterez votre logique pour envoyer la question à l'API
      console.log('Données de la question:', {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      })

      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Redirection vers la page d'accueil après succès
      navigate('/')
    } catch (error) {
      console.error('Erreur lors de la publication:', error)
      setErrors({ submit: 'Une erreur est survenue lors de la publication' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (window.confirm('Voulez-vous vraiment annuler ? Vos modifications seront perdues.')) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* En-tête */}
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Poser une question publique</h1>
            <p className="text-blue-100 mt-1">
              Partagez vos connaissances et aidez la communauté
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Titre de la question */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la question
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Comment résoudre une erreur TypeError en JavaScript ?"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Soyez spécifique et imaginez que vous posez une question à une autre personne
              </p>
            </div>

            {/* Détails de la question */}
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                Détails de la question
              </label>
              <textarea
                id="details"
                name="details"
                rows={12}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                  errors.details ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Décrivez votre problème en détail. Incluez tout ce qui pourrait être utile pour comprendre et résoudre votre question..."
                value={formData.details}
                onChange={handleChange}
              />
              {errors.details && (
                <p className="text-red-500 text-xs mt-1">{errors.details}</p>
              )}
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">Conseils pour une bonne question :</p>
                <ul className="list-disc list-inside space-y-1 mt-1 text-xs">
                  <li>Décrivez le problème que vous rencontrez</li>
                  <li>Expliquez ce que vous avez déjà essayé</li>
                  <li>Incluez des extraits de code si nécessaire</li>
                  <li>Indiquez les messages d'erreur exacts</li>
                </ul>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.tags ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="javascript, react, nodejs (séparés par des virgules)"
                value={formData.tags}
                onChange={handleChange}
              />
              {errors.tags && (
                <p className="text-red-500 text-xs mt-1">{errors.tags}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Ajoutez jusqu'à 5 tags pour décrire le sujet de votre question
              </p>
            </div>

            {/* Aperçu (optionnel) */}
            <div className="bg-gray-50 rounded-lg p-4 border">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Aperçu de votre question</h3>
              <div className="text-sm text-gray-600">
                {formData.title ? (
                  <h4 className="text-blue-600 font-medium mb-2">{formData.title}</h4>
                ) : (
                  <p className="text-gray-400 italic">Le titre apparaîtra ici...</p>
                )}
                {formData.details ? (
                  <p className="text-gray-700">{formData.details.substring(0, 200)}...</p>
                ) : (
                  <p className="text-gray-400 italic">Les détails apparaîtront ici...</p>
                )}
                {formData.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.tags.split(',').map((tag, index) => (
                      tag.trim() && (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {tag.trim()}
                        </span>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Boutons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                disabled={isSubmitting}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publication...
                  </span>
                ) : (
                  'Publier la question'
                )}
              </button>
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}
          </form>
        </div>

        {/* Conseils supplémentaires */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-medium text-blue-900 mb-3">Conseils pour rédiger une bonne question</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">✓ À faire</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Rédigez un titre clair et concis</li>
                <li>Décrivez votre problème en détail</li>
                <li>Fournissez du code pertinent</li>
                <li>Expliquez ce que vous avez déjà essayé</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">✗ À éviter</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Les titres vagues comme "Aidez-moi"</li>
                <li>Les images de code au lieu du texte</li>
                <li>Les questions trop larges ou générales</li>
                <li>Les demandes de code tout fait</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}