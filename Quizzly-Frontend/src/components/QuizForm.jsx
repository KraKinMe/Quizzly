import { useState } from 'react'
import './QuizForm.css'

export default function QuizForm({ onStart }) {
  const [topic, setTopic] = useState('javascript')
  const [count, setCount] = useState(5)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!topic.trim()) return setError('Please enter a topic')
    const n = Number(count)
    if (!n || n < 1 || n > 21) return setError('Please enter number between 1 and 50')
    onStart({ topic: topic.trim(), count: n })
  }

  return (
    <div className="quiz-form-root">
      <form className="quiz-form card" onSubmit={handleSubmit} aria-label="Start quiz">
        <h2 className="form-title">Create a Quiz</h2>
        <p className="form-sub">Tell us what topic you want and how many questions.</p>

        <label className="field">
          <span className="label">Topic</span>
          <input
            className="input"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. JavaScript, Python, Math"
            required
          />
        </label>

        <label className="field">
          <span className="label">Number of questions</span>
          <input
            className="input"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min={1}
            max={50}
            required
          />
        </label>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <button className="btn primary" type="submit">Start Quiz</button>
        </div>
      </form>
    </div>
  )
}
