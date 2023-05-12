import React, { useState } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, amount: 50, date: '2022-01-01' },
    { id: 2, amount: 100, date: '2022-02-01' },
    { id: 3, amount: 75, date: '2022-03-01' },
  ]);

  return (
    <div>
      <h1>Transactions History</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
