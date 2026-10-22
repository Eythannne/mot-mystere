import { Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil.jsx'
import Partie from './pages/Partie.jsx'



function App() {

return (
  <div className="App">
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/partie" element={<Partie />} />
    </Routes>
  </div>
)
}

export default App
