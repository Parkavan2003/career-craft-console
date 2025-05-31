
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Clock } from 'lucide-react';
import { Job } from '@/hooks/useJobs';

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `₹${(min/100000).toFixed(1)}L - ₹${(max/100000).toFixed(1)}L`;
    if (min) return `₹${(min/100000).toFixed(1)}L+`;
    if (max) return `Up to ₹${(max/100000).toFixed(1)}L`;
    return 'Salary not specified';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '24h Ago';
    return `${diffDays}d Ago`;
  };

  const getCompanyInitial = (companyName: string) => {
    return companyName.charAt(0).toUpperCase();
  };

  const getCompanyColor = (companyName: string) => {
    const colors = [
      { bg: 'bg-gray-800', text: 'text-white' },
      { bg: 'bg-blue-600', text: 'text-white' }, 
      { bg: 'bg-orange-500', text: 'text-white' },
      { bg: 'bg-green-600', text: 'text-white' },
      { bg: 'bg-purple-600', text: 'text-white' },
      { bg: 'bg-red-600', text: 'text-white' }
    ];
    const index = companyName.length % colors.length;
    return colors[index];
  };

  const companyColor = getCompanyColor(job.company_name);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      {/* Header with Logo and Date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${companyColor.bg}`}>
            {getCompanyInitial(job.company_name)}
          </div>
        </div>
        <Badge className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium border-0 hover:bg-blue-50">
          {formatDate(job.created_at)}
        </Badge>
      </div>
      
      {/* Job Title */}
      <h3 className="font-semibold text-lg text-gray-900 mb-1 leading-tight">
        {job.job_title}
      </h3>
      
      {/* Experience and Remote/Onsite */}
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>1-3 yr Exp</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          <span>Onsite</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>12LPA</span>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        A user-friendly interface lets you browse stunning photos and videos. 
        Filter destinations based on interests and travel style, and create personalized itineraries.
      </p>
      
      {/* Apply Button */}
      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg h-11 font-medium transition-colors">
        Apply Now
      </Button>
    </div>
  );
};
