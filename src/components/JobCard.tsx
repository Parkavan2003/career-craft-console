
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users, Building } from 'lucide-react';
import { Job } from '@/hooks/useJobs';

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `₹${(min/1000).toFixed(0)}k - ₹${(max/1000).toFixed(0)}k`;
    if (min) return `₹${(min/1000).toFixed(0)}k+`;
    if (max) return `Up to ₹${(max/1000).toFixed(0)}k`;
    return 'Salary not specified';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const getCompanyInitial = (companyName: string) => {
    return companyName.charAt(0).toUpperCase();
  };

  const getCompanyColor = (companyName: string) => {
    const colors = [
      'bg-blue-600',
      'bg-green-600', 
      'bg-purple-600',
      'bg-red-600',
      'bg-orange-600',
      'bg-teal-600'
    ];
    const index = companyName.length % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${getCompanyColor(job.company_name)}`}>
            {getCompanyInitial(job.company_name)}
          </div>
          <div>
            <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 mb-1">
              {formatDate(job.created_at)}
            </Badge>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{job.job_title}</h3>
      
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <Building className="h-4 w-4 mr-2" />
        <span>{job.company_name}</span>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-2">
        <MapPin className="h-4 w-4 mr-2" />
        <span>{job.location}</span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className={`px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700`}>
            {job.job_type}
          </span>
        </div>
        
        <div className="text-sm font-medium text-gray-900">
          {formatSalary(job.salary_min, job.salary_max)}
        </div>

        {job.application_deadline && (
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Apply by {new Date(job.application_deadline).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      
      {job.job_description && (
        <div className="text-sm text-gray-600 mb-4 line-clamp-3">
          {job.job_description.substring(0, 100)}...
        </div>
      )}
      
      <Button 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg h-10"
      >
        Apply Now
      </Button>
    </div>
  );
};
