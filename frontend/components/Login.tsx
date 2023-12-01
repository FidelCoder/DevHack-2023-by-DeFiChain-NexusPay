import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true)
  const { login } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (phoneNumber.length !== 10 || password.length !== 4) {
    setIsValid(false);
    return;
  }
  try {
    const response = await fetch('https://nexus-pay-quill-con-code-quest-97b9.vercel.app/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: '+254' + phoneNumber, password }),
    });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      if (login) {
        if (data.token) {
          login({ token: data.token, phoneNumber: data.phoneNumber, walletAddress: data.walletAddress });
        } else {
          console.error("No token received from the server.");
        }
      } else {
        console.error("Login function is not defined in the context.");
      }
      
    } catch (err) {
      console.error('Login Error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-600 to-green-500">
      <div className="w-96 p-8 bg-purple-700 rounded-lg shadow-md">
        <h1 className="text-white text-2xl mb-4 text-center">NEXUSPAY</h1>
        
        {/* Phone Number Input */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="phone-number">
            Phone Number (+254)
          </label>
          <input 
            id="phone-number"
            type="tel" 
            maxLength={10} // restricts to 9 digits
            placeholder=" 0712345678" 
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isValid && 'border-red-500 border'}`} 
            value={phoneNumber}
            onChange={e => {
              setIsValid(true);
              setPhoneNumber(e.currentTarget.value);
            }}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="pin">
            PIN(4 digits)
          </label>
          <input 
            id="pin"
            type="password"
            maxLength={4} // restricts to 4 digits
            placeholder="1234" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </div>

        {!isValid && <p className="text-red-500 mb-4">Please enter a valid phone number and 4-digit password.</p>}

        {/* Connect Button */}
        <button onClick={handleSubmit} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Connect
        </button>
      </div>
    </div>
  );
          
};

export default Login;
