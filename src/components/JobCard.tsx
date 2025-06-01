
import React from 'react';
import { MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  job: {
    id: string;
    job_title: string;
    company_name: string;
    location: string;
    job_type: string;
    salary_min?: number;
    salary_max?: number;
    experience_required?: string;
    job_description?: string;
    created_at: string;
  };
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Not disclosed';
    if (min && max) return `₹${min/100000}L - ₹${max/100000}L`;
    if (min) return `₹${min/100000}L+`;
    return `Up to ₹${max!/100000}L`;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  // Generate company logo using UI Avatars service
  const companyLogoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name)}&background=1f2937&color=ffffff&size=40&bold=true&format=png`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header with logo and time */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src={companyLogoUrl}
              alt={`${job.company_name} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to text initial if image fails
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-white font-bold text-sm">${job.company_name.charAt(0).toUpperCase()}</span>`;
                }
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{job.job_title}</h3>
            <p className="text-sm text-gray-600">{job.company_name}</p>
          </div>
        </div>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
          {getTimeAgo(job.created_at)}
        </span>
      </div>

      {/* Job details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Briefcase className="w-4 h-4" />
            <span>{job.experience_required || '0-2 yrs'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{job.job_type}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 text-sm">
          <DollarSign className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-900">{formatSalary(job.salary_min, job.salary_max)}</span>
        </div>
      </div>

      {/* Job description */}
      {job.job_description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {job.job_description}
        </p>
      )}

      {/* Apply button */}
      <Button 
        className="w-full text-white font-medium py-2 rounded-lg transition-colors duration-200"
        style={{ backgroundColor: '#00AAFF' }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#0099ee';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.backgroundColor = '#00AAFF';
        }}
      >
        Apply Now
      </Button>
    </div>
  );
};
