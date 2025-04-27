import React, { useState } from 'react';
import { Edit, Trash2, Plus, Filter } from 'lucide-react';
import { patients } from '../../data/mockData';
import { Patient } from '../../types';

const Patients: React.FC = () => {
  const [filter, setFilter] = useState('Tous les services');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const services = ['Tous les services', 'Cardiologie', 'Pédiatrie', 'Urgences'];
  
  const filteredPatients = filter === 'Tous les services' 
    ? patients 
    : patients.filter(patient => patient.service === filter);

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  const handleDelete = (patientId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
      // In a real application, this would make an API call
      console.log('Deleting patient:', patientId);
    }
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Hospitalisé': return 'bg-blue-100 text-blue-800';
      case 'Consultation': return 'bg-green-100 text-green-800';
      case 'Traitement': return 'bg-purple-100 text-purple-800';
      case 'Sorti': return 'bg-gray-100 text-gray-800';
      case 'Critique': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Patients</h2>
      
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} className="mr-2" />
          <span>Nouveau Patient</span>
        </button>
        
        <div className="flex items-center">
          <Filter size={16} className="text-gray-500 mr-2" />
          <select 
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {services.map((service, index) => (
              <option key={index} value={service}>{service}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(patient)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(patient.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredPatients.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              Aucun patient trouvé avec les critères sélectionnés.
            </div>
          )}
        </div>
      </div>

      {/* Modal Nouveau Patient */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Nouveau Patient</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nom du patient"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {services.filter(s => s !== 'Tous les services').map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Consultation">Consultation</option>
                    <option value="Hospitalisé">Hospitalisé</option>
                    <option value="Traitement">Traitement</option>
                    <option value="Critique">Critique</option>
                  </select>
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
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modifier Patient */}
      {showEditModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Modifier Patient</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedPatient.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedPatient.service}
                  >
                    {services.filter(s => s !== 'Tous les services').map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedPatient.status}
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="Hospitalisé">Hospitalisé</option>
                    <option value="Traitement">Traitement</option>
                    <option value="Critique">Critique</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;