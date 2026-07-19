import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import KnowledgeHub from './pages/KnowledgeHub';
import ChecklistPage from './pages/ChecklistPage';
import HomePage from './pages/Homepage';
import RiskAssessment from './pages/RiskAssessment';
import FloodAIAssistant from './pages/FloodAIAssistant';
import Register from './pages/Register';
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/knowledge-hub" element={<KnowledgeHub />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/risk-assessment" element={<RiskAssessment />} />
        <Route path="/ai-assistant" element={<FloodAIAssistant />} />
        <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;