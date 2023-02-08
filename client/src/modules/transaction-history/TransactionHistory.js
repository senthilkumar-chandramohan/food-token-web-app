import { useState } from 'react';

const TransactionHistory = () => {
    const [history, setHistory] = useState('...');

    (()=> {
        const accountID = window.localStorage.getItem('accountID');
        console.log(window.localStorage);

        if (history === '...') {
            fetch(`https://192.168.0.112:443/get-txn-history?accountID=${accountID}`, {
                method: 'GET',
            }).then((response) => {
                response.json().then(parsedJson => {
                    // code that can access both here
                    console.log(parsedJson);
                    setHistory(parsedJson.txnHistory.result);
                })
                
            }).catch((err) => {
                setHistory('Error fetching transaction history');
                console.log(err);
            });
        }
    })();

    console.log("historyh", history);

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    {
                        history === '...'?
                        <p>Loading Transaction History...</p>:
                        history.map((transaction) => (
                            <div>
                                <h4>Block Hash: {transaction.blockHash}</h4>
                                <h4>Txn Hash: {transaction.hash}</h4>
                                <p>To: {transaction.to}</p>
                                <p>Value: {transaction.value/1000000000000000000}</p>
                                <br/><br/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default TransactionHistory;
