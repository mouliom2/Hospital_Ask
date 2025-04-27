import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Bonjour, je suis l\'assistant IA d\'Askamoul. Comment puis-je vous aider aujourd\'hui?',
      sender: 'ai',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (query: string): string => {
    // Simple mock responses based on keywords
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('rendez-vous') || lowerQuery.includes('rdv')) {
      return 'Vous pouvez gérer les rendez-vous dans la section Rendez-vous. Souhaitez-vous que je vous aide à planifier un nouveau rendez-vous?';
    } else if (lowerQuery.includes('patient')) {
      return 'Les informations des patients sont disponibles dans la section Patients. Vous pouvez y ajouter de nouveaux patients ou modifier les dossiers existants.';
    } else if (lowerQuery.includes('personnel') || lowerQuery.includes('médecin') || lowerQuery.includes('infirmier')) {
      return 'La gestion du personnel est accessible via la section Personnel. Vous y trouverez la liste de tous les membres du personnel médical et administratif.';
    } else if (lowerQuery.includes('diagnostic') || lowerQuery.includes('symptômes')) {
      return 'Je peux vous aider à analyser des symptômes. Veuillez me donner plus de détails sur les symptômes observés pour que je puisse suggérer des diagnostics possibles.';
    } else {
      return 'Je suis là pour vous aider avec la gestion de l\'hôpital. N\'hésitez pas à me poser des questions sur les patients, le personnel, les rendez-vous ou à me demander de l\'aide pour le diagnostic.';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Assistant IA Askamoul</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Posez votre question..."
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistantModal;