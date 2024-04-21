import React, { useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers'; 

const ConnectWallet = ({ onConnect }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [signature, setSignature] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ethProvider, setEthProvider] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      console.error('MetaMask is not installed or not available.');
      setErrorMessage('MetaMask is not installed or not available.'); // Set user-friendly error message
      return;
    }
  
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const providerUrl = 'https://sn2-stavanger-rpc.eu-north-2.gateway.fm'; // Replace with your actual provider URL
      const provider = new JsonRpcProvider(providerUrl);
      setEthProvider(provider); // Store the Ethereum provider instance
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setWalletConnected(true);
      onConnect(address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setErrorMessage('Error connecting wallet. Please try again.'); // Set user-friendly error message
    }
  };
  

  const signMessage = async () => {
    if (walletConnected && ethProvider) {
      try {
        const signer = ethProvider.getSigner();
        const message = 'Verification message';
        const signature = await signer.signMessage(message);
        setSignature(signature);
        // Send the signature to your backend for verification
      } catch (error) {
        console.error('Error signing message:', error);
        setErrorMessage('Error signing message. Please try again.'); // Set user-friendly error message
      }
    } else {
      setErrorMessage('Wallet not connected. Please connect your wallet.'); // Set user-friendly message to connect wallet
    }
  };

  return (
    <div>
      {!walletConnected ? (
        <>
          <button onClick={connectWallet}>Connect Wallet</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      ) : (
        <>
          <p>Connected Wallet Address: {walletAddress}</p>
          <button onClick={signMessage}>Sign Message</button>
          {signature && <p>Signature: {signature}</p>}
        </>
      )}
    </div>
  );
};

export default ConnectWallet;
