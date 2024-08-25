import React, { useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';
import PatientList from '@/components/PatientList';
import PatientForm from '@/components/PatientForm';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
// Estado inicial con algunos pacientes para llenar la lista al inicio
const initialPatients = [
  { id: 1, name: 'Daniel Murillo', age: 27, registerDate: '2023-08-10', symptoms: 'Diabetes' },
  { id: 2, name: 'Flor Venegas', age: 58, registerDate: '2023-08-11', symptoms: 'Asthma' },
  { id: 3, name: 'Valeria Prendas', age: 22, registerDate: '2023-08-12', symptoms: 'Anemia' },
];
export default function PatientRegistry() {
    // Estado para manejar la lista de pacientes
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPatients, setFilteredPatients] = useState(initialPatients);
    // Estado para manejar el paciente seleccionado al editar o eliminar
  const [selectedPatient, setSelectedPatient] = useState(null);
    // Estado para mostrar u ocultar el formulario
  const [isFormOpen, setIsFormOpen] = useState(false);
    // Estado para mostrar u ocultar el modal de confirmación de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    // Función para agregar un nuevo paciente a la lista
  const addPatient = (patient) => {
    setPatients([...patients, { ...patient, id: patients.length + 1 }]);
  };
  // Función para actualizar un paciente existente en la lista
  const updatePatient = (updatedPatient) => {
    setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
  };
  // Función para eliminar un paciente de la lista
  const deletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
    setIsDeleteModalOpen(false); // Cierra el modal después de eliminar
  };
  // Manejo de la búsqueda
  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filteredData = patients.filter(patient => {
      return Object.keys(patient).some(key =>
        patient[key].toString().toLowerCase().includes(lowercasedFilter)
      )
    })
    setFilteredPatients(filteredData)
  }, [patients, searchTerm]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Patient Registry</h1>
      
      <div className="mb-4 flex justify-between items-center">
        <input 
          type="text" 
          placeholder="Search patients..." 
          className="max-w-xs p-2 border border-gray-300 rounded-md"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 rounded-md text-white hover:bg-sky-200 hover:text-blue-950 focus:outline-none"
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add Patient </button>
      </div>

      <PatientList 
        patients={filteredPatients} 
        onEdit={(patient) => {
          setSelectedPatient(patient);
          setIsFormOpen(true);
        }}
        onDelete={(patient) => {
          setSelectedPatient(patient);
          setIsDeleteModalOpen(true);
        }}
      />

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedPatient ? 'Edit Patient' : 'Add New Patient'}</h2>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <PatientForm 
              patient={selectedPatient} 
              onSubmit={(patient) => {
                if (selectedPatient) {
                  updatePatient(patient);
                } else {
                  addPatient(patient);
                }
                setIsFormOpen(false);
                setSelectedPatient(null);
              }} 
            />
          </div>
        </div>
      )}
      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deletePatient(selectedPatient.id)}
        patientName={selectedPatient?.name}
      />
    </div>
  );
}
