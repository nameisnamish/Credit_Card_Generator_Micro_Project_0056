import React from 'react';

const CreditCard = ({ cardDetails }) => {
  const {
    name = '',
    number = '',
    expMonth = '',
    expYear = '',
    cvc = ''
  } = cardDetails || {};

  const formatCardNumber = (num) => {
    if (!num) return '0000 0000 0000 0000';
    const cleanNum = num.replace(/\s+/g, '');
    const padded = cleanNum.padEnd(16, '0');
    return padded.match(/.{1,4}/g)?.join(' ') || '0000 0000 0000 0000';
  };

  return (
    <div className="cards-container">
      {/* Front Card */}
      <div className="card card-front">
        <div className="card-top-row">
          <div className="card-logo">
            <div className="logo-circle-large"></div>
            <div className="logo-circle-small"></div>
          </div>
          <div className="emv-chip">
            <div className="chip-line horizontal"></div>
            <div className="chip-line vertical"></div>
          </div>
        </div>
        <div className="card-details">
          <div className="card-number-display">
            {formatCardNumber(number)}
          </div>
          <div className="card-info-bottom">
            <span>{name ? name.toUpperCase() : 'JANE APPLESEED'}</span>
            <span>
              {expMonth ? expMonth.padStart(2, '0') : '00'}/
              {expYear ? expYear.padStart(2, '0') : '00'}
            </span>
          </div>
        </div>
      </div>

      {/* Back Card */}
      <div className="card card-back">
        <div className="black-stripe"></div>
        <div className="cvc-stripe">
          <span className="cvc-display">
            {cvc ? cvc.padStart(3, '0') : '000'}
          </span>
        </div>
        <div className="card-back-lines">
          <div className="card-line"></div>
          <div className="card-line"></div>
          <div className="card-line short"></div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
