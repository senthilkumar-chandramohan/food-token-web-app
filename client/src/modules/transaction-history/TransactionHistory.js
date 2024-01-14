import { useState } from 'react';
import moment from 'moment';

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
                    console.log("parsedJson", parsedJson);
                    setHistory(parsedJson.txnHistory);
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
                        <>
                            <h2>Transaction History</h2>
                            <table>
                                <tr>
                                    <th>Date/Time</th>
                                    <th>Type</th>
                                    <th>Credit From/Payment to</th>
                                    <th>Amount</th>
                                    <th>Txn Details</th>
                                </tr>
                                {
                                    history.map((transaction) => {
                                        const {
                                            timeStamp,
                                            txnType,
                                            to,
                                            value,
                                            hash,
                                        } = transaction;

                                        return (
                                            <tr>
                                                <td>{moment(parseInt(timeStamp)*1000).format("DD-MM-YYYY h:mm:ss A")}</td>
                                                <td>{txnType}</td>
                                                <td>{txnType === 'PAYMENT' ? to : 'EMPLOYER'}</td>
                                                <td>{value}</td>
                                                <td><a href={`https://mumbai.polygonscan.com/tx/${hash}`} target="_blank">Link</a></td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                        </>
                    }
                </div>
            </div>
        </div>
    )
};

export default TransactionHistory;
