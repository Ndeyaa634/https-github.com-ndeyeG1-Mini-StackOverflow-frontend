import React from 'react'
import Tag from './Tag'

export default function QuestionCard({ question }){
  return (
    <div className="bg-white text-gray-800 rounded-lg p-4 shadow flex gap-4">
      <div className="w-20 text-center">
        <div className="font-bold text-lg">{question.votes}</div>
        <div className="text-sm text-gray-500">votes</div>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{question.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">{question.description}</p>
        <div className="flex items-center gap-2 mt-3">
          {question.tags?.map(t => <Tag key={t} tag={t} />)}
        </div>
      </div>

      <div className="w-40 text-right text-sm">
        <div>{question.answers_count} réponses</div>
        <div>{question.views} vues</div>
      </div>
    </div>
  )
}
