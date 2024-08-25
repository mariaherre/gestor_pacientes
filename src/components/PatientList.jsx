import React from 'react';
import { format } from 'date-fns';
// Este componente muestra una lista de pacientes en una tabla
function PatientList({ patients, onEdit, onDelete }) {
// Contenedor para permitir el scroll horizontal en tablas grandes
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Age</th>
            <th className="border p-2 text-left">Register Date</th>
            <th className="border p-2 text-left">Symptoms</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-50">
              <td className="border p-2">{patient.name}</td>
              <td className="border p-2">{patient.age}</td>
              <td className="border p-2">
                {patient.registerDate ? format(new Date(patient.registerDate), 'dd/MM/yyyy') : 'Invalid date'}
              </td>
              <td className="border p-2">{patient.symptoms}</td>
              <td className="border p-2">
                <button
                  className="mr-2 px-3 py-1 text-sm border border-gray-300 text-white hover:text-blue-950 rounded-md hover:bg-sky-200 focus:outline-none"
                  onClick={() => onEdit(patient)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                  onClick={() => onDelete(patient)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;
