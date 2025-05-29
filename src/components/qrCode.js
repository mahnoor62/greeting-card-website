
import React from 'react';
import QRCode from 'react-qr-code';

const QRCodeGenerator = ({ value }) => {
  return (
    <div style={{ background: 'white', padding: '16px' }}>
      <QRCode value={value} size={256} />
    </div>
  );
};

export default QRCodeGenerator;
