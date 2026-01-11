import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser } from 'react-icons/fi';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useApp } from '../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple mock authentication
    if (credentials.username && credentials.password) {
      login({
        name: credentials.username,
        role: 'admin',
        email: `${credentials.username}@restaurant.com`,
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Restaurant ERP</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FiUser className="absolute left-3 top-10 text-gray-400" />
            <Input
              label="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Enter your username"
              required
              className="pl-10"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-10 text-gray-400" />
            <Input
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter your password"
              required
              className="pl-10"
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Demo credentials: Any username/password combination</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
