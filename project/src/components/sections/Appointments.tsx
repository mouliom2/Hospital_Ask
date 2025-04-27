import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { appointments, monthNames, dayNames } from '../../data/mockData';

const Appointments: React.FC = () => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Generate calendar days for the current month
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    let firstDayOfMonth = firstDay.getDay() - 1;
    if (firstDayOfMonth < 0) firstDayOfMonth = 6;
    
    const daysInMonth = lastDay.getDate();
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: '', isCurrentMonth: false });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dayStr = i.toString().padStart(2, '0');
      const monthStr = (currentMonth + 1).toString().padStart(2, '0');
      const dateStr = `${currentYear}-${monthStr}-${dayStr}`;
      
      const hasAppointments = appointments.some(apt => apt.date === dateStr);
      
      days.push({ 
        day: i, 
        isCurrentMonth: true,
        dateStr,
        hasAppointments
      });
    }
    
    return days;
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const filteredAppointments = useMemo(() => {
    if (!selectedDate) return [];
    return appointments.filter(apt => apt.date === selectedDate);
  }, [selectedDate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion des Rendez-vous</h2>
      
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} className="mr-2" />
          <span>Nouveau Rendez-vous</span>
        </button>
        
        <div className="flex items-center">
          <CalendarIcon size={16} className="text-gray-500 mr-2" />
          <input 
            type="date" 
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <button 
            onClick={handlePrevMonth}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-medium">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button 
            onClick={handleNextMonth}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {dayNames.map((day, i) => (
            <div key={i} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
          
          {calendarDays.map((day, i) => (
            <div 
              key={i} 
              className={`bg-white p-2 h-24 ${day.isCurrentMonth ? 'cursor-pointer hover:bg-blue-50' : 'bg-gray-50'}`}
              onClick={() => day.dateStr && setSelectedDate(day.dateStr)}
            >
              <div className={`flex justify-between ${selectedDate === day.dateStr ? 'bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center' : ''}`}>
                <span className={`${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'} text-sm`}>
                  {day.day}
                </span>
                {day.hasAppointments && (
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                )}
              </div>
              
              {selectedDate === day.dateStr && filteredAppointments.length > 0 && (
                <div className="mt-1">
                  {filteredAppointments.map((apt, idx) => (
                    idx < 2 && (
                      <div key={apt.id} className="text-xs p-1 mb-1 bg-blue-50 rounded truncate">
                        {apt.time} - {apt.patientName}
                      </div>
                    )
                  ))}
                  {filteredAppointments.length > 2 && (
                    <div className="text-xs text-blue-600">
                      +{filteredAppointments.length - 2} plus
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {selectedDate && (
          <div className="p-4 border-t">
            <h4 className="font-medium mb-2">
              Rendez-vous du {new Date(selectedDate).toLocaleDateString('fr-FR')}
            </h4>
            {filteredAppointments.length > 0 ? (
              <div className="space-y-2">
                {filteredAppointments.map(apt => (
                  <div key={apt.id} className="p-2 bg-blue-50 rounded-md flex justify-between">
                    <div>
                      <p className="font-medium">{apt.patientName}</p>
                      <p className="text-sm text-gray-600">{apt.service} - {apt.doctorName}</p>
                    </div>
                    <div className="text-blue-800 font-medium">
                      {apt.time}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aucun rendez-vous pour cette date.</p>
            )}
          </div>
        )}
      </div>

      {/* Modal Nouveau Rendez-vous */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Nouveau Rendez-vous</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Sélectionner un patient</option>
                    {appointments.map(apt => (
                      <option key={apt.id} value={apt.patientName}>{apt.patientName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Médecin</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Sélectionner un médecin</option>
                    {appointments.map(apt => (
                      <option key={apt.id} value={apt.doctorName}>{apt.doctorName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Sélectionner un service</option>
                    <option value="Cardiologie">Cardiologie</option>
                    <option value="Pédiatrie">Pédiatrie</option>
                    <option value="Urgences">Urgences</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Notes supplémentaires..."
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
    </div>
  );
};

export default Appointments;