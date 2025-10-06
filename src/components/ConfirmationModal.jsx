import React, { useEffect } from 'react';

const ConfirmationModal = ({ isOpen, onClose, title, message, type = 'success' }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getIconAndColors = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'ri-check-line',
          bgColor: 'bg-green-600'
        };
      case 'error':
        return {
          icon: 'ri-error-warning-line',
          bgColor: 'bg-red-600'
        };
      default:
        return {
          icon: 'ri-information-line',
          bgColor: 'bg-blue-600'
        };
    }
  };

  const { icon, bgColor } = getIconAndColors();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-600">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}>
            <i className={`${icon} text-xl text-white`}></i>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white text-center mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-300 text-center mb-6 text-sm leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
          {message}
        </p>

        {/* Close Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className={`${bgColor} hover:opacity-90 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 text-base`}
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
