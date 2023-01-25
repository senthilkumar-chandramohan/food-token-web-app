import React, { useState, useRef } from 'react';
import QrcReader from 'react-qr-scanner';
import SendTokens from '../send-tokens/SendTokens';

function ScanQRC() {
    const qrReader = useRef(null);
    const [scanData, setScanData] = useState(null);

    function handleScan(result) {
        console.log('result', result);
        if (result) {
            setScanData(JSON.parse(result?.text));
        }
    }

    function handleError(err){
        console.error(err);
    }

    // const openImageDialog = () => {
    //     console.log(qrReader);
    //     qrReader.current.openImageDialog();
    // }

    const previewStyle = {
        width: '100%',
    }

    if (scanData) {
        const {
            address,
            sellerName,
            amount,
        } = scanData;
    
        if (address && address.length) {
            return (
                <SendTokens sellerAddress={address} sellerName={sellerName} amount={amount} />
            )
        }
    }

    return (
        <div>
            <QrcReader
                delay={1000}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
                legacyMode={true}
            />
            {/* <button id="uploadFromGallery" onClick={openImageDialog}>Upload QR Image</button> */}
        </div>
    )
}

export default ScanQRC;
