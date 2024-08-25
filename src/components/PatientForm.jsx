import React, { useState } from 'react';

// Este componente representa un formulario para agregar o editar un paciente
function PatientForm({ patient, onSubmit }) {
    // Estado para almacenar los datos del formulario, se inicializa con el paciente o valores vacíos
  const [formData, setFormData] = useState(patient || { name: '', age: '', registerDate: '', symptoms: '' });
  // Función para manejar los cambios en los inputs y actualizar el estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Función que se llama al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Se envían los datos del formulario al componente padre
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
        <input 
          type="number" 
          id="age" 
          name="age" 
          value={formData.age} 
          onChange={handleChange} 
          required 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="registerDate" className="block text-sm font-medium text-gray-700">Register Date</label>
        <input 
          type="date" 
          id="registerDate" 
          name="registerDate" 
          value={formData.registerDate} 
          onChange={handleChange} 
          required 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">Symptoms</label>
        <input 
          type="text" 
          id="symptoms" 
          name="symptoms" 
          value={formData.symptoms} 
          onChange={handleChange} 
          required 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button 
        type="submit" 
        className="px-4 py-2 rounded-md text-white hover:bg-sky-200 hover:text-blue-950 focus:outline-none"
      >
        {patient ? 'Update Patient' : 'Add Patient'}
      </button>
    </form>
  );
}

export default PatientForm;
