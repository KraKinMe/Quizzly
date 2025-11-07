import { useState } from 'react'
import Quiz from './components/Quiz'
import QuizForm from './components/QuizForm'
import './App.css'
import heroImage from './assets/image.png'

function App() {
  const [currentView, setCurrentView] = useState('landing') // 'landing', 'quiz-form', 'quiz'
  const [quizParams, setQuizParams] = useState(null)
  
  function handleMouseMove(e) {
    const parallaxLayer = document.querySelector('.parallax-layer')
    if (!parallaxLayer) return
    
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    
    const moveX = (clientX - innerWidth / 2) / 50
    const moveY = (clientY - innerHeight / 2) / 50
    
    parallaxLayer.style.transform = `translate(${moveX}px, ${moveY}px)`
  }

  function handleStartQuiz() {
    setCurrentView('quiz-form')
  }

  function handleQuizParamsSubmit(params){
    setQuizParams(params)
    setCurrentView('quiz')
  }

  function handleBack(){
    setQuizParams(null)
    setCurrentView('quiz-form')
  }

  function handleBackToHome() {
    setQuizParams(null)
    setCurrentView('landing')
  }

  return (
    <div className="root-container">
      {/* Simple Background Animations */}
      <div className="background">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
      </div>
      
      {/* Main Content Layer */}
      <div className="app-root" onMouseMove={handleMouseMove}>
        <div className="parallax-layer" aria-hidden="true" />
        <div className="bg-particles" aria-hidden="true" />
        
        <nav className="app-nav">
        <div className="nav-logo">Quizzly</div>
        {currentView !== 'landing' && (
          <button className="nav-back" onClick={handleBackToHome}>
            Back to Home
          </button>
        )}
      </nav>

      {currentView === 'landing' && (
        <>
          <div className="landing-container">
            <div className="landing-content">
              <div className="app-hero">
                <div className="hero-badge">AI-Powered Quiz Platform</div>
                <h1>Test Your Knowledge with AI Intelligence</h1>
                <p className="subtitle">Experience adaptive learning through our AI-driven quiz platform. Challenge yourself with personalized questions.</p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-value">1000+</div>
                    <div className="stat-label">Questions</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">50+</div>
                    <div className="stat-label">Topics</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">24/7</div>
                    <div className="stat-label">AI Support</div>
                  </div>
                </div>
                <button className="start-button" onClick={handleStartQuiz}>
                  Start Quiz Now
                  <span className="button-icon">→</span>
                </button>
              </div>

              <div className="tech-pills">
                <span className="pill">React</span>
                <span className="pill">OpenAI</span>
                <span className="pill">Machine Learning</span>
                <span className="pill">Neural Networks</span>
              </div>
            </div>

            <div className="landing-image">
              <img src={heroImage} alt="Quiz illustration" className="hero-image" />
            </div>
          </div>

          <div className="features-section">
            <h2 className="section-title">Why Choose Our Platform?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🧠</div>
                <h3>Adaptive Learning</h3>
                <p>Questions adapt to your skill level for optimal learning progression</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Personalized Topics</h3>
                <p>Choose from a wide range of subjects tailored to your interests</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Instant Feedback</h3>
                <p>Get immediate results and detailed explanations for each answer</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Progress Tracking</h3>
                <p>Monitor your improvement with detailed performance analytics</p>
              </div>
            </div>
          </div>

          <div className="how-it-works">
            <h2 className="section-title">How It Works</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Choose Your Topic</h3>
                <p>Select from various subjects and difficulty levels</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Take the Quiz</h3>
                <p>Answer questions adapted to your knowledge level</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Get Results</h3>
                <p>Receive instant feedback and detailed explanations</p>
              </div>
            </div>
          </div>
        </>
      )}

      {currentView === 'quiz-form' && (
        <div className="app-layout">
          <div className="app-main">
            <QuizForm onStart={handleQuizParamsSubmit} />
          </div>
          <aside className="app-aside">
            <img src={heroImage} alt="Quiz illustration" />
          </aside>
        </div>
      )}

      {currentView === 'quiz' && (
        <div className="app-layout">
          <div className="app-main">
            <div className="quiz-header">
              <button className="btn ghost" onClick={handleBack}>Change settings</button>
              <div className="quiz-info">Topic: <strong>{quizParams.topic}</strong> • Questions: <strong>{quizParams.count}</strong></div>
            </div>
            <Quiz topic={quizParams.topic} count={quizParams.count} />
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default App
