import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap'; // Import Navbar component from React Bootstrap
import ConnectWallet from './components/ConnectWallet';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import './App.css';

function App() {
  const [connectedAddress, setConnectedAddress] = useState(null);

  const handleConnect = (address) => {
    console.log('Connected Address:', address); 
    setConnectedAddress(address);
  };

  return (
    <main className="App">
      {/* Navbar component with custom styling */}
      <Navbar className="navbar-custom" expand="lg">
        <Navbar.Brand>FEDHA.IO</Navbar.Brand>
      </Navbar>

      <div className="container">
        <div className="header">
          <p>Welcome To FEDHA.IO</p>
          <ConnectWallet onConnect={handleConnect} />
        </div>

        {connectedAddress ? (
          <>
            <RegisterUser connectedAddress={connectedAddress} />
            <LoginUser connectedAddress={connectedAddress} />
          </>
        ) : (
          <i>Please connect your wallet.</i>
        )}
      </div>
    </main>
  );
}

export default App;
