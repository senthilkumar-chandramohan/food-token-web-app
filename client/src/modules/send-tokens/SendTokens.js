import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PaymentSuccess from "../payment-success/PaymentSuccess";

const SendTokens = (props) => {
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const {
        accountID,
        sellerName,
        amount = '',
    } = props;

    const paySeller = () => {
        const note = document.getElementById('note').value;

        fetch('http://localhost:3001/send-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromAccountID: window.localStorage.getItem('accountID'),
                toAccountID: accountID,
                amount,
                note,
            }),
        }).then((response) => {
            console.log(response);
            setSuccess(true);
        }).catch((err) => {
            setSuccess(false);
            console.log(err);
        });
    }

    if (success) {
        return (<PaymentSuccess sellerName={sellerName} amount={amount} />)
    }

    return (
        <div id="send-tokens" class="send-tokens">
            {
                success===false
                ?<div className="error">Error while paying seller, please try again</div>
                :<></>
            }
            <h3>Paying {sellerName}</h3>
            <span class="token-logo">₹</span><input type="number" className="amount" defaultValue={amount} />
            <input type="text" class="note" id="note" placeholder="Add a note" />
            <button id="sendTokens" class="pay" onClick={paySeller}>Pay</button>
            <a class="cancel" onClick={()=>{
                navigate("/");
            }}>Cancel</a>
        </div>
    )
};

export default SendTokens;
