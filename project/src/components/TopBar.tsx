import React, { useState } from 'react';
import { Search, User } from 'lucide-react';
import { patients, staffMembers } from '../data/mockData';

interface TopBarProps {
  onOpenAIAssistant: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onOpenAIAssistant }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setShowResults(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = [
      ...patients.filter(patient => 
        patient.name.toLowerCase().includes(lowerQuery) ||
        patient.id.toLowerCase().includes(lowerQuery)
      ).map(patient => ({ ...patient, type: 'patient' })),
      ...staffMembers.filter(staff => 
        staff.name.toLowerCase().includes(lowerQuery) ||
        staff.id.toLowerCase().includes(lowerQuery)
      ).map(staff => ({ ...staff, type: 'staff' }))
    ];

    setSearchResults(results);
    setShowResults(true);
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center w-1/2 relative">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Rechercher patients, personnel..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchQuery && setShowResults(true)}
          />
          
          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
              {searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.map((result, index) => (
                    <div
                      key={result.id}
                      className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => {
                        setShowResults(false);
                        setSearchQuery('');
                      }}
                    >
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-gray-500">
                        {result.type === 'patient' ? 'Patient' : 'Personnel'} - {result.service}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Aucun résultat trouvé
                </div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={onOpenAIAssistant}
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <span>IA Assistant</span>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="bg-blue-100 rounded-full p-2">
            <User size={20} className="text-blue-600" />
          </div>
          <span className="ml-2 font-medium">Dr. Martin</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;