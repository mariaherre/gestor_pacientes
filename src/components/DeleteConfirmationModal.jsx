import React from 'react';

// Este componente representa un modal para confirmar la eliminación de un paciente
// Si el modal no está abierto, no se muestra nada
function DeleteConfirmationModal({ isOpen, onClose, onConfirm, patientName }) {
  if (!isOpen) return null;

  return (
        // Fondo oscuro que cubre toda la pantalla y centra el modal
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Confirm Deletion</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete the patient record for {patientName}? This action cannot be undone.
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border text-white rounded-md hover:bg-sky-200 hover:text-blue-950 focus:outline-none"
          > Cancel</button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
          >Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
