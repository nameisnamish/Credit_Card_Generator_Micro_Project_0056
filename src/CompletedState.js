import React from 'react';

const CompletedState = ({ onReset }) => {
  return (
    <div className="form-container">
      <div className="completed-state">
        <div className="icon-complete">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className="completed-title">THANK YOU!</h2>
        <p className="completed-text">We've added your card details</p>
        <button className="btn-submit" onClick={onReset} id="continue-button">
          Continue
        </button>
      </div>
    </div>
  );
};

export default CompletedState;
