import React from 'react';
import { Users, Calendar, UserCircle, Layers } from 'lucide-react';
import { dashboardStats } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    { 
      title: 'Patients', 
      value: dashboardStats.patients, 
      label: 'Total des patients',
      icon: <Users size={24} className="text-blue-600" />
    },
    { 
      title: 'Rendez-vous', 
      value: dashboardStats.appointments, 
      label: 'Aujourd\'hui',
      icon: <Calendar size={24} className="text-green-600" />
    },
    { 
      title: 'Personnel', 
      value: dashboardStats.staff, 
      label: 'Membres actifs',
      icon: <UserCircle size={24} className="text-purple-600" />
    },
    { 
      title: 'Services', 
      value: dashboardStats.services, 
      label: 'Départements',
      icon: <Layers size={24} className="text-orange-600" />
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
              <div className="bg-blue-50 p-2 rounded-full">
                {stat.icon}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;