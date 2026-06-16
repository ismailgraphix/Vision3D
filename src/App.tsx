import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ToonHubHero from './components/ToonHubHero'
import VisitorsPage from './pages/VisitorsPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToonHubHero />} />
        <Route path="/visitors" element={<VisitorsPage />} />
      </Routes>
    </Router>
  )
}
