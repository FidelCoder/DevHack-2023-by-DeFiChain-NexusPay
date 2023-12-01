import { useState } from 'react';

const ConnectForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [pinVisible, setPinVisible] = useState(false);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Here you'd handle the submission of the phone number and PIN
    console.log(`Phone Number: ${phoneNumber}, PIN: ${pin}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-600 to-green-500">
      <div className="w-96 p-8 bg-purple-700 rounded-lg shadow-md">
        <h1 className="text-white text-2xl mb-4 text-center">Connect</h1>
        <form>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="phone-number">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone-number"
              type="tel"
              placeholder="Your phone number"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="pin">
              4-Digit PIN
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="pin"
              type="password"
              placeholder="****"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Connect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConnectForm;
