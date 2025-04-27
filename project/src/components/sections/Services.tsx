import React, { useState } from 'react';
import { PlusCircle, Users, UserCircle } from 'lucide-react';
import { services } from '../../data/mockData';

const Services: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const handleShowDetails = (service: typeof services[0]) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Services</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-4">{service.name}</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <UserCircle size={20} className="mr-2 text-blue-600" />
                <p>{service.doctorCount} médecins</p>
              </div>
              <div className="flex items-center text-gray-700">
                <Users size={20} className="mr-2 text-blue-600" />
                <p>
                  {service.name === 'Urgences' 
                    ? 'Variable' 
                    : `${service.patientCount} patients`}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button 
                onClick={() => handleShowDetails(service)}
                className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Voir les détails
              </button>
            </div>
          </div>
        ))}
        
        <div 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-50 rounded-lg border-2 border-dashed border-blue-200 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-100 transition-colors"
        >
          <PlusCircle size={40} className="text-blue-600 mb-3" />
          <p className="text-blue-800 font-medium mb-3">Ajouter un service</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            Créer un service
          </button>
        </div>
      </div>

      {/* Modal Nouveau Service */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Nouveau Service</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du service</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nom du service"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacité</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre de lits"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Description du service"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Créer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails Service */}
      {showDetailsModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-6">{selectedService.name}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Statistiques</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Médecins</span>
                      <span className="font-medium">{selectedService.doctorCount}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Patients</span>
                      <span className="font-medium">
                        {selectedService.name === 'Urgences' ? 'Variable' : selectedService.patientCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Taux d'occupation</span>
                      <span className="font-medium">85%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Personnel de garde</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded">Dr. Martin (Chef de service)</div>
                    <div className="p-2 bg-gray-50 rounded">Dr. Dubois</div>
                    <div className="p-2 bg-gray-50 rounded">Inf. Lambert</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Équipements</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-gray-50 rounded">Scanner - Disponible</div>
                  <div className="p-2 bg-gray-50 rounded">IRM - En maintenance</div>
                  <div className="p-2 bg-gray-50 rounded">Radiologie - Disponible</div>
                  <div className="p-2 bg-gray-50 rounded">Échographie - Disponible</div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;