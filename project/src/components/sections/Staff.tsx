import React, { useState } from 'react';
import { Edit, Trash2, Plus, Filter } from 'lucide-react';
import { staffMembers } from '../../data/mockData';

const Staff: React.FC = () => {
  const [filter, setFilter] = useState('Tous les rôles');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const roles = ['Tous les rôles', 'Médecin', 'Infirmier', 'Administration'];
  const services = ['Cardiologie', 'Pédiatrie', 'Urgences', 'Direction'];
  
  const filteredStaff = filter === 'Tous les rôles' 
    ? staffMembers 
    : staffMembers.filter(member => member.role === filter);

  const handleEdit = (staff: any) => {
    setSelectedStaff(staff);
    setShowEditModal(true);
  };

  const handleDelete = (staffId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce membre du personnel ?')) {
      // In a real application, this would make an API call
      console.log('Deleting staff member:', staffId);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion du Personnel</h2>
      
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} className="mr-2" />
          <span>Nouveau Membre</span>
        </button>
        
        <div className="flex items-center">
          <Filter size={16} className="text-gray-500 mr-2" />
          <select 
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(member)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(member.id)}
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
          
          {filteredStaff.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              Aucun membre du personnel trouvé avec les critères sélectionnés.
            </div>
          )}
        </div>
      </div>

      {/* Modal Nouveau Membre */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Nouveau Membre du Personnel</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nom complet"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {roles.filter(role => role !== 'Tous les rôles').map((role, index) => (
                      <option key={index} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="email@hopital-askamoul.fr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+33 1 23 45 67 89"
                  />
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

      {/* Modal Modifier Membre */}
      {showEditModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Modifier Membre du Personnel</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedStaff.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedStaff.role}
                  >
                    {roles.filter(role => role !== 'Tous les rôles').map((role, index) => (
                      <option key={index} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedStaff.service}
                  >
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={`${selectedStaff.name.toLowerCase().replace(' ', '.')}@hopital-askamoul.fr`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="+33 1 23 45 67 89"
                  />
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

export default Staff;