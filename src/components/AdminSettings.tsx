import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

export default function AdminSettings() {
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
        setToastMessage('Admin credentials updated successfully. Please login again.');
        setShowToast(true);
        
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      {/* Component content remains the same... */}
      
      <Toast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}