import QRCode from 'react-qr-code';

const GenerateQRC = ({sellerName, address, amount}) => {
    const payload = JSON.stringify({
        sellerName,
        address,
        amount,
    });

    return (
        <div style={{ background: 'white', padding: '16px' }}>
            <QRCode value={payload} />
        </div>
    )
};

export default GenerateQRC;
