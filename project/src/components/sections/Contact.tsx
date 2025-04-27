import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({
        type: 'success',
        text: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage(null);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Contact</h2>
        <p className="text-gray-600 mt-2">Contactez-nous pour toute question ou assistance</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-blue-600 text-white">
              <h3 className="text-xl font-semibold mb-2">Nos coordonnées</h3>
              <p className="text-blue-100">N'hésitez pas à nous contacter</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Hôpital Askamoul</h4>
                  <p className="text-gray-600 mt-1">123 Avenue de la Santé<br />75001 Paris, France</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Téléphone</h4>
                  <p className="text-gray-600 mt-1">Standard: +33 1 23 45 67 89<br />Urgences: +33 1 23 45 67 90</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600 mt-1">contact@hopital-askamoul.fr<br />urgences@hopital-askamoul.fr</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Horaires</h4>
                  <p className="text-gray-600 mt-1">Services administratifs:<br />Lun-Ven: 8h30-17h30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Envoyez-nous un message</h3>
            
            {submitMessage && (
              <div className={`p-4 mb-6 rounded-md ${
                submitMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {submitMessage.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre email"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="rdv">Rendez-vous</option>
                  <option value="info">Demande d'information</option>
                  <option value="urgence">Urgence</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;