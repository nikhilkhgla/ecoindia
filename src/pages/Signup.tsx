import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, MapPin, Phone, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

type SignupFormData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  confirmPassword: string;
  farmSize: string;
  agreeTerms: boolean;
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
  const password = watch('password', '');
  
  const onSubmit = (data: SignupFormData) => {
    console.log('Signup data:', data);
    // In a real app, this would submit to a backend API
    alert('Registration successful! (This is a frontend demo only)');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-gray-600 mt-2">Join thousands of farmers using EcoIndia for sustainable agriculture</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Enter your full name"
                    {...register('fullName', { required: 'Full name is required' })}
                  />
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Enter your email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Enter your phone number"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    })}
                  />
                  <Phone className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
              </div>
              
              <div>
                <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    id="location"
                    className={`w-full px-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Village/City, State"
                    {...register('location', { required: 'Location is required' })}
                  />
                  <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Create a password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Confirm your password"
                    {...register('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="farmSize" className="block text-gray-700 font-medium mb-2">Farm Size (Optional)</label>
                <select
                  id="farmSize"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register('farmSize')}
                >
                  <option value="">Select your farm size</option>
                  <option value="small">Small (Less than 1 hectare)</option>
                  <option value="medium">Medium (1-5 hectares)</option>
                  <option value="large">Large (More than 5 hectares)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  {...register('agreeTerms', { required: 'You must agree to the terms and privacy policy' })}
                />
                <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              {errors.agreeTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeTerms.message}</p>}
            </div>
            
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium"
              >
                Create Account
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
              Sign in
            </Link>
          </div>
        </div>
        
        <div className="mt-8 bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-green-800 mb-2">Why Join EcoIndia?</h3>
          <ul className="list-disc pl-5 text-green-700 space-y-1">
            <li>AI-powered recommendations for your specific farming needs</li>
            <li>Connect with agricultural experts and fellow farmers</li>
            <li>Access to sustainable and eco-friendly farming products</li>
            <li>Personalized crop calendar based on your location and crops</li>
            <li>Free plant disease detection through our Farm Scanner</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Signup;
