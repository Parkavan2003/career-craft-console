
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

  // Generate a deterministic company logo URL based on company name
  const getCompanyLogoUrl = (companyName: string) => {
    const logoSize = 48;
    const encodedName = encodeURIComponent(companyName);
    return `https://ui-avatars.com/api/?name=${encodedName}&size=${logoSize}&background=2563eb&color=ffffff&bold=true&format=png&rounded=true`;
  };

  const companyLogos = ["/download.jpg", "/tesla.png", "/zoho.png", "/amazon.png"];
  const randomLogo = companyLogos[Math.floor(Math.random() * companyLogos.length)];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 font-['Inter',_sans-serif]">
      {/* Header with Logo and Date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center overflow-hidden shadow-lg">
            {/* <img 
              src={getCompanyLogoUrl(job.company_name)}
              alt={`${job.company_name} logo`}
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                // Fallback to styled initial if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-white font-bold text-lg">${getCompanyInitial(job.company_name)}</span>`;
                }
              }}
            /> */}
            <img src="/download.jpg" alt="company_logo" />
          </div>
        </div>
        <Badge className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium border-0 hover:bg-blue-50">
          {formatDate(job.created_at)}
        </Badge>
      </div>
      
      {/* Job Title */}
      <h3 className="font-semibold text-lg text-gray-900 mb-3 leading-tight">
        {job.job_title}
      </h3>
      
      {/* Experience, Work Type, and Salary */}
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1.5 text-gray-500" />
          <span className="font-medium">1-3 yr Exp</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1.5 text-gray-500" />
          <span className="font-medium">Onsite</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
          <span className="font-medium">12LPA</span>
        </div>
      </div>
      
      {/* Job Description */}
      <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-3">
        {job.job_description || "Join our dynamic team and work on cutting-edge projects using modern technologies. We offer great learning opportunities, collaborative environment, and competitive compensation."}
      </p>
      
      {/* Apply Button */}
      <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white rounded-xl h-12 font-semibold transition-colors text-sm">
        Apply Now
      </Button>
    </div>
  );
};
