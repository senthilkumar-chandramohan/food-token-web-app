import { useState } from 'react';

const ViewBalance = () => {
    const [balance, setBalance] = useState('...');

    (()=> {
        const accountID = window.localStorage.getItem('accountID');
        console.log(window.localStorage);

        fetch(`https://192.168.0.112:443/get-balance?accountID=${accountID}`, {
            method: 'GET',
        }).then((response) => {
            response.json().then(parsedJson => {
                // code that can access both here
                console.log(parsedJson);
                setBalance(parsedJson.balance);
            })
            
        }).catch((err) => {
            setBalance('Error fetching balance');
            console.log(err);
        });
    })();

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    Your Balance: <span class="token-logo">₹ {balance}</span>
                </div>
            </div>
        </div>
    )
};

export default ViewBalance;
