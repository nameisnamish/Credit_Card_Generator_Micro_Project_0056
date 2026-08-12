import React, { useState } from 'react';

import CreditCard from './CreditCard';
import CardDetailsForm from './CardDetailsForm';
import CompletedState from './CompletedState';
import SuccessToast from './SuccessToast';
import './App.css';

function App() {
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFormChange = (updatedData) => {
    // Live update preview if desired
    setCardDetails(updatedData);
  };

  const handleFormSubmit = (submittedData) => {
    setCardDetails(submittedData);
    setIsSubmitted(true);
    setShowToast(true);

    // Auto dismiss toast after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCardDetails({
      name: '',
      number: '',
      expMonth: '',
      expYear: '',
      cvc: ''
    });
  };

  return (
    <div className="app-container">
      {/* Sidebar background */}
      <div className="sidebar-bg"></div>

      {/* Credit Card preview graphics */}
      <CreditCard cardDetails={cardDetails} />

      {/* Form or Completed State */}
      <main className="main-content">
        {!isSubmitted ? (
          <CardDetailsForm
            onSubmitSuccess={handleFormSubmit}
            onFormChange={handleFormChange}
            currentValues={cardDetails}
          />
        ) : (
          <CompletedState onReset={handleReset} />
        )}
      </main>

      {/* Success Toast */}
      {showToast && (
        <SuccessToast
          message="Card details confirmed successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default App;
