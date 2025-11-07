import { useState, useMemo, useEffect } from 'react'
import axios from "axios"
import './Quiz.css'

function QuestionCard({ q, selectedOption, onSelect }) {
  return (
    <div className="question-card">
      <h3 className="question">{q.text}</h3>
      <div className="options">
        {q.options.map((opt) => (
          <button
            key={opt.id}
            className={`option-btn ${selectedOption === opt.id ? 'selected' : ''}`}
            onClick={() => onSelect(opt.id)}
          >
            <span className="opt-letter">{opt.id.toUpperCase()}.</span>
            <span className="opt-text">{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Quiz({ topic = 'javascript', count = 5 }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const pageSize = 1

  useEffect(() => {
    async function fetchQuiz() {
      if (!topic) return
      try {
        setLoading(true)
        setError(null)

        const { data } = await axios.post(
          'https://quizzly-backend-2.onrender.com/quiz',
          { topic, count },
          { headers: { 'Content-Type': 'application/json' } }
        )

        setQuestions(data || [])
        setPage(0)
      } catch (err) {
        console.error('Failed to fetch quiz:', err)
        setError(err.message || 'Failed to load quiz')
        setQuestions([])
      } finally {
        setLoading(false)
      }
    }

    fetchQuiz()
  }, [topic, count])

  const totalPages = Math.ceil(questions.length / pageSize)
  const currentQuestion = questions[page]

  function handleSelect(optId) {
    setAnswers((a) => ({ ...a, [currentQuestion.id]: optId }))
  }

  const score = useMemo(() => {
    return questions.reduce((sum, q) => {
      const sel = answers[q.id]
      if (!sel) return sum
      const opt = q.options.find((o) => o.id === sel)
      return sum + (opt?.points || 0)
    }, 0)
  }, [answers, questions])

  function next() {
    if (page < totalPages - 1) setPage((p) => p + 1)
  }

  function prev() {
    if (page > 0) setPage((p) => p - 1)
  }

  function submit() {
    setSubmitted(true)
  }

  function reset() {
    setAnswers({})
    setPage(0)
    setSubmitted(false)
  }

  // Loading state
  if (loading) {
    return (
      <div className="quiz-root">
        <div className="card quiz-card loading-card" role="status" aria-live="polite">
          <div className="loading-bar" aria-hidden>
            <div className="loading-indeterminate" />
          </div>
          <p className="loading-text">Loading quiz...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="quiz-root">
        <div className="card">
          <h2 style={{color: "red"}}>Error</h2>
          <p>{error}</p>
          <button className="btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Empty questions state
  if (questions.length === 0) {
    return (
      <div className="quiz-root">
        <div className="card">
          <p>No questions available</p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="quiz-root">
        <div className="results card">
          <h2 style={{color:"black"}}>Results</h2>
          <p className="score" style={{color:"green"}}>
            Your score: <strong>{score}</strong> / {questions.length}
          </p>
          <div className="breakdown">
            {questions.map((q) => {
              const sel = answers[q.id]
              const selectedOpt = q.options.find((o) => o.id === sel)
              const earned = selectedOpt?.points || 0
              return (
                <div className="result-item" key={q.id}>
                  <div className="res-q">{q.text}</div>
                  <div className={`res-a ${earned ? 'correct' : 'wrong'}`}>
                    {sel ? (
                      <>
                        <span className="res-opt">You: {selectedOpt.text}</span>
                        <span className="res-points">+{earned}</span>
                      </>
                    ) : (
                      <span className="res-opt missing">No answer</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="results-actions">
            <button className="btn" onClick={reset}>Try Again</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-root">
      <div className="card quiz-card">
        <header className="quiz-header">
          <h2>Quick Quiz</h2>
          <div className="progress">Question {page + 1} / {questions.length}</div>
        </header>

        <QuestionCard
          q={currentQuestion}
          selectedOption={answers[currentQuestion.id]}
          onSelect={handleSelect}
        />

        <footer className="quiz-footer">
          <div className="nav">
            <button className="btn ghost" onClick={prev} disabled={page === 0}>
              Previous
            </button>
            {page < totalPages - 1 ? (
              <button className="btn" onClick={next}>Next</button>
            ) : (
              <button className="btn primary" onClick={submit}>Submit</button>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}
