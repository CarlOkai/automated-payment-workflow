"use client"

import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Streamflow } from '@streamflow/stream';

const Payout = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [connection, setConnection] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const connectWallet = async () => {
      if (window.solana && window.solana.isPhantom) {
        try {
          const response = await window.solana.connect();
          setWalletAddress(response.publicKey.toString());
          setConnection(new Connection('https://api.devnet.solana.com'));
        } catch (err) {
          console.error('Failed to connect wallet', err);
        }
      }
    }
    connectWallet();
  }, []);

  const handlePayout = async () => {
    if (!walletAddress || !connection) return;

    try {
      const streamflow = new Streamflow(connection, window.solana);
      const recipientPubKey = new PublicKey(recipient);
      
      const result = await streamflow.createStream({
        sender: window.solana.publicKey,
        recipient: recipientPubKey,
        amount: amount * 1e9,
        start: new Date(),
        end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        period: 24 * 60 * 60,
      });

      setStatus('Payout stream created successfully!');
    } catch (error) {
      console.error('Error creating payout stream:', error);
      setStatus('Failed to create payout stream');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Automate Payouts</h2>
      {walletAddress ? (
        <>
          <p>Connected wallet: {walletAddress}</p>
          <div className="mb-3">
            <label className="form-label">Recipient Address</label>
            <input
              type="text"
              className="form-control"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Amount (SOL)</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handlePayout}>
            Automate Payout
          </button>
          {status && <p>{status}</p>}
        </>
      ) : (
        <button className="btn btn-primary" onClick={() => window.solana.connect()}>
          Connect Phantom Wallet
        </button>
      )}
    </div>
  );
};

export default Payout;
