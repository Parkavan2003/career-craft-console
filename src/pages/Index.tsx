
import React, { useState } from 'react';
import { JobListings } from '../components/JobListings';
import { CreateJobModal } from '../components/CreateJobModal';
import { Header } from '../components/Header';

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateJob={() => setIsCreateModalOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobListings />
      </main>
      <CreateJobModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
