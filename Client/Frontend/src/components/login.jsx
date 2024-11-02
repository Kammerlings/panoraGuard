import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockUsers from '../mockdata/mockUsers';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate from useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
 // Checks username and password
 const user = mockUsers.find((user) => user.username === username && user.password === password);

 if (user) {
  console.log('User found:', user);
   // Resets eventual errors
   setError('');

   // Redirects based on user role
   switch (user.role) {
    case 'admin':
      navigate('/admin');
      break;
    case 'operator':
      navigate('/operator');
      break;
    case 'manager':
      navigate('/dashboard');
      break;
    default:
      setError('Unknown role');
  }
} else {
  // Error if a user cannot be found.
  setError('Incorrect username or password.');
}
};

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="leftPanel flex flex-1 justify-center items-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-LightGray p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-NavyBlue mb-6">
            <div className="max-w-xs text-center">
              Enter your username and password
            </div>
          </h2>

          {/* Error message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Please enter your username"
              className="mt-1 block w-full px-4 py-2 border border-ButtonsBlue rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" // Blue border
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Please enter your password"
              className="mt-1 block w-full px-4 py-2 border border-ButtonsBlue rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" // Blue border
            />
            <span
              className="absolute right-4 top-9 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-ButtonsBlue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Right Panel */}
      <div className="rightPanel flex flex-1 justify-center items-center bg-NavyBlue bg-opacity-80 text-white text-6xl font-bold">
        <div className="max-w-xs text-center">
          All-Around Awareness Anytime Anywhere
        </div>
      </div>
    </div>
  );
};

export default Login;
