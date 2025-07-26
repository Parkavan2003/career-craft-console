
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCreateJob: () => void;
}

export const Header = ({ onCreateJob }: HeaderProps) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-100 w-2/3 mx-auto rounded-3xl mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
            <div className="w-10 h-10  rounded-lg flex items-center justify-center">
          <div className="w-16 h-16">
            <img src="/download.jpg" alt="Logo" className="w-full h-full object-contain cursor-pointer" />
          </div>
        </div>
      </div>
            
            {/* Navigation */}
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-semibold transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Find Jobs</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Find Talents</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">About us</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">Testimonials</a>
            </nav>
          </div>
          
          {/* Create Jobs Button */}
          <Button 
            onClick={onCreateJob}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Create Jobs
          </Button>
        </div>
      </div>
    </header>
  );
};
