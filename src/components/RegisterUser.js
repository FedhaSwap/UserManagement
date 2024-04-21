import React, { useState } from 'react';
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';
import UserManagementABI from '../UserManagement.json';



const RegisterUser = ({ connectedAddress }) => {
  const [username, setUsername] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  const registerUser = async () => {
    try {
      // Connect to your deployed contract
      const provider = new JsonRpcProvider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = '0x59B0D7c9541f1ACd1549E85608C9cC58d6d17E35'; // Replace with your actual contract address
      const contract = new ethers.Contract(contractAddress, UserManagementABI, signer);


      // Call the registerUser function on the contract
      const transaction = await contract.registerUser(username);
      await transaction.wait();

      setRegistrationStatus('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
      setRegistrationStatus('Error registering user');
    }
  };

  return (
    <div>
      <h2>Register User</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={registerUser}>Register</button>
      {registrationStatus && <p>{registrationStatus}</p>}
    </div>
  );
};

export default RegisterUser;
