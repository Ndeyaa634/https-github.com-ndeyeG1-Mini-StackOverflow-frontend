import React from 'react'
import { Link } from 'react-router-dom'

export default function Tag({ tag, isClickable = true }){
  if(!isClickable) return <span className="px-2 py-1 rounded text-sm bg-blue-50 text-blue-900">{tag}</span>
  return <Link to={`/tags/${tag}/questions`} className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-900">{tag}</Link>
}
