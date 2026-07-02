import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import KnowledgeHub from './pages/KnowledgeHub';
import ChecklistPage from './pages/ChecklistPage';
import HomePage from './pages/Homepage';
import RiskAssessment from './pages/RiskAssessment';

const AIAssistant = () => <div className="p-12 text-center text-xl font-semibold">AI-Powered Flood Assistant Chatbot (Coming Soon)</div>;

function App() {
  return (
    <Router>
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/knowledge-hub" element={<KnowledgeHub />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/risk-assessment" element={<RiskAssessment />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
      </Routes>
    </Router>
  );
}

export default App;