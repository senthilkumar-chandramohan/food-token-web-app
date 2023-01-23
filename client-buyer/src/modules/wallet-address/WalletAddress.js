function WalletAddress(props) {
    const { address } = props;
    const dispAddress = `Your Address: ${address.substring(0, 8)}...${address.substr(35)}`;

    const copyToClipboard = (el) => {
        const copyText = el.target.getAttribute('data-address');
        navigator.clipboard.writeText(copyText);

        console.log("Wallet Address: " + copyText);
    }

    return (
        <div className="wallet-address">
            <input type="text" readOnly={true} value={dispAddress} />
            <button className="copy-address" id="copy-wallet-address" data-address={address} onClick={copyToClipboard}>&nbsp;</button>
        </div>
    )
}

export default WalletAddress;
