
import React, { useState } from 'react';
import { JobCard } from './JobCard';
import { JobFilters } from './JobFilters';
import { mockJobs } from '../data/mockJobs';

export const JobListings = () => {
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  const handleFilterChange = (filters: any) => {
    let filtered = mockJobs;

    if (filters.jobTitle) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(filters.jobTitle.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.jobType && filters.jobType !== 'all') {
      filtered = filtered.filter(job => job.type === filters.jobType);
    }

    if (filters.salaryRange) {
      filtered = filtered.filter(job => {
        const jobSalary = parseInt(job.salary.replace(/[₹,k-]/g, ''));
        return jobSalary >= filters.salaryRange[0] && jobSalary <= filters.salaryRange[1];
      });
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className="space-y-6">
      <JobFilters onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};
