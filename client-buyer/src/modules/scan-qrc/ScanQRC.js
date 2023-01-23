import React, { useState } from 'react';
import QrcReader from 'react-qr-scanner';
import QRCode from 'react-qr-code';

function ScanQRC() {
    const [address, setAddress] = useState(null);

    function handleScan(result) {
        console.log('result', result);
        if (result) {
            setAddress(result?.text);
        }
    }

    function handleError(err){
        console.error(err);
    }

    const previewStyle = {
        height: 240,
        width: 240,
    }
  
    if (address && address.length) {
        return (
            <div style={{ background: 'white', padding: '16px' }}>
                <QRCode value={address} />
            </div>
        )
    }

    return (
        <div>
            <QrcReader
            delay={10000}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
            />
        </div>
    )
}

export default ScanQRC;
