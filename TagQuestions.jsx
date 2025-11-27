import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import QuestionCard from '../Components/common/QuestionCard';
import Tag from '../Components/common/Tag';
import axios from 'axios';

const TagQuestions = () => {
  const { tagName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // try to fetch from backend, fallback to sample
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/tags/${tagName}/questions`);
        setQuestions(res.data || []);
      } catch (e) {
        setQuestions([
          { id:1, title:`Exemple ${tagName}`, description:'Exemple', tags:[tagName,'demo'], votes:2, answers_count:0, views:10, user:{username:'Demo'}, created_at: new Date().toISOString() }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tagName]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <Link to="/" className="text-blue-200 hover:text-white">← Retour</Link>
        <div className="bg-white text-gray-800 p-3 rounded">
          <Tag tag={tagName} isClickable={false} />
        </div>
        <h1 className="text-2xl font-bold">Questions avec le tag : {tagName}</h1>
      </div>

      {loading ? <div className="py-12">Chargement...</div> : (
        <div className="space-y-4">
          {questions.map(q => <QuestionCard key={q.id} question={q} />)}
        </div>
      )}
    </div>
  );
};

export default TagQuestions;
