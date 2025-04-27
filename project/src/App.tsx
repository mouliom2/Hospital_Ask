import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import AIAssistantModal from './components/AIAssistantModal';
import { 
  Dashboard, 
  Patients, 
  Staff, 
  Appointments, 
  Services, 
  AIAnalysis, 
  Contact 
} from './components/sections';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <Patients />;
      case 'staff':
        return <Staff />;
      case 'appointments':
        return <Appointments />;
      case 'services':
        return <Services />;
      case 'ai-analysis':
        return <AIAnalysis />;
      case 'contact':
        return <Contact />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="flex-1 flex flex-col">
        <TopBar onOpenAIAssistant={() => setIsAIAssistantOpen(true)} />
        
        <main className="flex-1 overflow-auto">
          {renderActiveSection()}
        </main>
      </div>
      
      <AIAssistantModal 
        isOpen={isAIAssistantOpen} 
        onClose={() => setIsAIAssistantOpen(false)} 
      />
    </div>
  );
}

export default App;