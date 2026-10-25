import { Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil.jsx'
import Partie from './pages/Partie.jsx'
import Scores from './pages/Scores.jsx'
import Stats from './pages/Stats.jsx'
import Regles from './pages/Regles.jsx'

function App() {

return (
  <div className="App">
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/partie" element={<Partie />} />
      <Route path="/scores" element={<Scores />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/regles" element={<Regles />} />
    </Routes>
  </div>
)
}

export default App
