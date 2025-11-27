import React from 'react'
import { Link } from 'react-router-dom'
const tags = ['react','tailwind','javascript','css','axios']
export default function TagsList(){
  return (
    <div className="bg-white text-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Tags populaires</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map(t => (
          <Link key={t} to={`/tags/${t}/questions`} className="px-3 py-1 rounded bg-blue-100 text-blue-900">{t}</Link>
        ))}
      </div>
    </div>
  )
}
