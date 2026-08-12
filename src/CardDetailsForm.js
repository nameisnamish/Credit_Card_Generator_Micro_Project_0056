import React, { useState } from 'react';

const CardDetailsForm = ({ onSubmitSuccess, onFormChange, currentValues }) => {
  const [formData, setFormData] = useState({
    name: currentValues?.name || '',
    number: currentValues?.number || '',
    expMonth: currentValues?.expMonth || '',
    expYear: currentValues?.expYear || '',
    cvc: currentValues?.cvc || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatting rules for live typing
    if (name === 'name') {
      // Allow only letters and spaces
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'number') {
      // Allow only numbers and spaces, limit length
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      formattedValue = cleaned.replace(/(.{4})/g, '$1 ').trim();
    } else if (name === 'expMonth' || name === 'expYear') {
      formattedValue = value.replace(/\D/g, '').slice(0, 2);
    } else if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    const updatedForm = { ...formData, [name]: formattedValue };
    setFormData(updatedForm);

    // Clear error for field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Optional real-time updates to parent card preview
    if (onFormChange) {
      onFormChange(updatedForm);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Can't be blank";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Wrong format, letters only";
    }

    // Card number validation
    const rawNumber = formData.number.replace(/\s+/g, '');
    if (!formData.number.trim()) {
      newErrors.number = "Can't be blank";
    } else if (!/^\d+$/.test(rawNumber)) {
      newErrors.number = "Wrong format, numbers only";
    } else if (rawNumber.length < 16) {
      newErrors.number = "Card number must be 16 digits";
    }

    // Exp Month validation
    if (!formData.expMonth.trim()) {
      newErrors.expMonth = "Can't be blank";
    } else if (!/^\d+$/.test(formData.expMonth)) {
      newErrors.expMonth = "Wrong format";
    } else {
      const monthNum = parseInt(formData.expMonth, 10);
      if (monthNum < 1 || monthNum > 12) {
        newErrors.expMonth = "Invalid month";
      }
    }

    // Exp Year validation
    if (!formData.expYear.trim()) {
      newErrors.expYear = "Can't be blank";
    } else if (!/^\d+$/.test(formData.expYear)) {
      newErrors.expYear = "Wrong format";
    } else if (formData.expYear.length < 2) {
      newErrors.expYear = "Must be 2 digits";
    }

    // CVC validation
    if (!formData.cvc.trim()) {
      newErrors.cvc = "Can't be blank";
    } else if (!/^\d+$/.test(formData.cvc)) {
      newErrors.cvc = "Wrong format, numbers only";
    } else if (formData.cvc.length !== 3) {
      newErrors.cvc = "Must be exactly 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmitSuccess(formData);
    }
  };

  return (
    <div className="form-container">
      <form className="credit-card-form" onSubmit={handleSubmit} noValidate>
        {/* Cardholder Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="cardholder-name">
            CARDHOLDER NAME
          </label>
          <input
            id="cardholder-name"
            type="text"
            name="name"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            placeholder="e.g. Jane Appleseed"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Card Number */}
        <div className="form-group">
          <label className="form-label" htmlFor="card-number">
            CARD NUMBER
          </label>
          <input
            id="card-number"
            type="text"
            name="number"
            className={`form-input ${errors.number ? 'input-error' : ''}`}
            placeholder="e.g. 1234 5678 9123 0000"
            value={formData.number}
            onChange={handleChange}
            maxLength={19}
          />
          {errors.number && <span className="error-message">{errors.number}</span>}
        </div>

        {/* Exp Date & CVC Row */}
        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">
              EXP. DATE (MM/YY)
            </label>
            <div className="exp-date-inputs">
              <input
                id="exp-month"
                type="text"
                name="expMonth"
                className={`form-input ${errors.expMonth ? 'input-error' : ''}`}
                placeholder="MM"
                value={formData.expMonth}
                onChange={handleChange}
                maxLength={2}
              />
              <input
                id="exp-year"
                type="text"
                name="expYear"
                className={`form-input ${errors.expYear ? 'input-error' : ''}`}
                placeholder="YY"
                value={formData.expYear}
                onChange={handleChange}
                maxLength={2}
              />
            </div>
            {(errors.expMonth || errors.expYear) && (
              <span className="error-message">
                {errors.expMonth || errors.expYear}
              </span>
            )}
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label" htmlFor="cvc">
              CVC
            </label>
            <input
              id="cvc"
              type="text"
              name="cvc"
              className={`form-input ${errors.cvc ? 'input-error' : ''}`}
              placeholder="e.g. 123"
              value={formData.cvc}
              onChange={handleChange}
              maxLength={3}
            />
            {errors.cvc && <span className="error-message">{errors.cvc}</span>}
          </div>
        </div>

        <button type="submit" className="btn-submit" id="confirm-button">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default CardDetailsForm;
