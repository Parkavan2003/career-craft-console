
import React, { useState } from 'react';
import { JobCard } from './JobCard';
import { JobFilters } from './JobFilters';
import { useJobs } from '@/hooks/useJobs';

export const JobListings = () => {
  const { jobs, isLoading, error } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  React.useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleFilterChange = (filters: any) => {
    console.log('Applying filters:', filters);
    let filtered = jobs;

    if (filters.jobTitle) {
      filtered = filtered.filter(job => 
        job.job_title.toLowerCase().includes(filters.jobTitle.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.jobType && filters.jobType !== 'all') {
      filtered = filtered.filter(job => job.job_type === filters.jobType);
    }

    if (filters.salaryRange) {
      filtered = filtered.filter(job => {
        if (!job.salary_min || !job.salary_max) return true;
        const minSalary = job.salary_min / 1000;
        const maxSalary = job.salary_max / 1000;
        return minSalary >= filters.salaryRange[0] && maxSalary <= filters.salaryRange[1];
      });
    }

    setFilteredJobs(filtered);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <JobFilters onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl mr-3"></div>
                <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <JobFilters onFilterChange={handleFilterChange} />
        <div className="text-center py-12">
          <p className="text-red-600">Error loading jobs. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <JobFilters onFilterChange={handleFilterChange} />
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No jobs found. {jobs.length === 0 ? 'Be the first to create a job posting!' : 'Try adjusting your filters.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};
