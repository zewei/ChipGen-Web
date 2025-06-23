import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { PhilosophyPage } from './pages/PhilosophyPage'
import { HistoryPage } from './pages/HistoryPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { TechnologyPage } from './pages/TechnologyPage'
import { Toaster } from './components/ui/toaster'
import { LanguageProvider } from './contexts/LanguageContext'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/philosophy" element={<PhilosophyPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/technology" element={<TechnologyPage />} />
            </Routes>
          </Layout>
          <Toaster />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
