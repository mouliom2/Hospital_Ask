import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { risks, recommendations } from '../../data/mockData';

const AIAnalysis: React.FC = () => {
  const [diagnosisInput, setDiagnosisInput] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  
  const handleDiagnosisSubmit = () => {
    if (!diagnosisInput.trim()) return;
    
    // Mock AI diagnosis response
    const responses = [
      "D'après les symptômes décrits, il pourrait s'agir d'une grippe saisonnière. Recommandation: repos, hydratation et surveillance de la température.",
      "Les symptômes peuvent indiquer une infection respiratoire. Recommandation: consultation médicale pour diagnostic précis et traitement.",
      "L'analyse des symptômes suggère une possible réaction allergique. Recommandation: éviter l'allergène suspecté et consulter un allergologue.",
      "Les signes décrits pourraient correspondre à une gastro-entérite. Recommandation: hydratation, régime alimentaire adapté, surveillance des symptômes."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setDiagnosisResult(randomResponse);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analyse par Intelligence Artificielle</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prédictions de Risques */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Prédictions de Risques</h3>
          <div className="space-y-6">
            {risks.map((risk, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{risk.name}</span>
                  <span className={`font-medium ${
                    risk.severity === 'high' ? 'text-red-600' : 
                    risk.severity === 'medium' ? 'text-orange-500' : 
                    'text-blue-600'
                  }`}>
                    {risk.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      risk.severity === 'high' ? 'bg-red-600' : 
                      risk.severity === 'medium' ? 'bg-orange-500' : 
                      'bg-blue-600'
                    }`}
                    style={{ width: `${risk.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Optimisation des Ressources */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Optimisation des Ressources</h3>
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Recommandations</h4>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mr-2">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{rec.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Aide au Diagnostic */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Aide au Diagnostic</h3>
          <div>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={diagnosisInput}
                onChange={(e) => setDiagnosisInput(e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Décrire les symptômes..."
              />
              <button
                onClick={handleDiagnosisSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Send size={16} className="mr-2" />
                <span>Analyser</span>
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              {diagnosisResult ? (
                <p className="text-gray-800">{diagnosisResult}</p>
              ) : (
                <p className="text-gray-500 italic">
                  Utilisez l'IA pour obtenir des suggestions de diagnostic basées sur les symptômes.
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Planification Intelligente */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Planification Intelligente</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <span className="block text-sm text-gray-600">Efficacité Planning</span>
              <span className="text-2xl font-bold text-blue-600">92%</span>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <span className="block text-sm text-gray-600">Temps d'Attente Moyen</span>
              <span className="text-2xl font-bold text-green-600">-15%</span>
              <div className="flex items-center justify-center mt-2">
                <span className="text-xs text-green-800">Réduction par rapport au mois dernier</span>
              </div>
            </div>
            
            <div className="col-span-2 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2">Améliorations Récentes</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                  <span>Réduction des périodes d'attente aux urgences</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                  <span>Optimisation des horaires du personnel médical</span>
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-600 mr-2"></div>
                  <span>Meilleure allocation des ressources matérielles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;