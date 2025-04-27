import React from 'react';
import { FileText, Users, UserCircle, Calendar, Layers, Brain, Mail } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <FileText size={20} /> },
    { id: 'patients', label: 'Patients', icon: <Users size={20} /> },
    { id: 'staff', label: 'Personnel', icon: <UserCircle size={20} /> },
    { id: 'appointments', label: 'Rendez-vous', icon: <Calendar size={20} /> },
    { id: 'services', label: 'Services', icon: <Layers size={20} /> },
    { id: 'ai-analysis', label: 'Analyse IA', icon: <Brain size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-blue-800">
        <h1 className="text-xl font-bold">Hôpital Askamoul</h1>
        <p className="text-sm text-blue-200 mt-1">Gestion Intelligente</p>
      </div>
      <nav className="flex-grow py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center w-full px-6 py-3 text-left transition-colors ${
              activeSection === item.id
                ? 'bg-blue-800 text-white'
                : 'text-blue-200 hover:bg-blue-800 hover:text-white'
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;