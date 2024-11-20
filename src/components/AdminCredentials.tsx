import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

export default function AdminCredentials() {
  const { updateAdminCredentials, logout } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentPassword) {
      setError('Current password is required');
      return;
    }

    try {
      const success = await updateAdminCredentials(
        email || '',
        currentPassword,
        newPassword || ''
      );

      if (success) {
        setToastMessage('Credentials updated successfully. Please login again.');
        setShowToast(true);
        
        // Clear form
        setEmail('');
        setCurrentPassword('');
        setNewPassword('');
        
        // Logout and redirect after a short delay
        setTimeout(() => {
          logout();
          navigate('/admin/login');
        }, 2000);
      } else {
        setError('Current password is incorrect');
      }
    } catch (err) {
      setError('An error occurred while updating credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Update Admin Credentials</h2>
          <p className="text-sm text-gray-600 mt-2">Change your login details</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain the same... */}
        </form>

        <Toast
          show={showToast}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      </div>
    </div>
  );
}