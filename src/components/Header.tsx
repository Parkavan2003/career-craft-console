
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCreateJob: () => void;
}

export const Header = ({ onCreateJob }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors">Find Jobs</a>
              <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors">Find Talents</a>
              <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors">About us</a>
              <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors">Testimonials</a>
            </nav>
          </div>
          
          {/* Create Jobs Button */}
          <Button 
            onClick={onCreateJob}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Create Jobs
          </Button>
        </div>
      </div>
    </header>
  );
};
