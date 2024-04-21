import React, { useState } from 'react';
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';
import UserManagementABI from '../UserManagement.json';


const LoginUser = ({ connectedAddress }) => {
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const loginUser = async () => {
    try {
      // Connect to your deployed contract
      const provider = new JsonRpcProvider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = '0x59B0D7c9541f1ACd1549E85608C9cC58d6d17E35'; // Replace with your actual contract address
      const contract = new ethers.Contract(contractAddress, UserManagementABI, signer);
      
      // Call the loginUser function on the contract
      const transaction = await contract.loginUser(username);
      await transaction.wait();

      setLoginStatus('Login successful!');
    } catch (error) {
      console.error('Error logging in user:', error);
      setLoginStatus('Error logging in user');
    }
  };

  return (
    <div>
      <h2>Login User</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={loginUser}>Login</button>
      {loginStatus && <p>{loginStatus}</p>}
    </div>
  );
};

export default LoginUser;
