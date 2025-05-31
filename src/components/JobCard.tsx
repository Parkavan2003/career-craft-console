
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  postedDays: string;
  logo: string;
  isOnsite: boolean;
  description: string;
}

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
            job.logo === 'amazon' ? 'bg-gray-800' : 
            job.logo === 'tesla' ? 'bg-red-600' :
            job.logo === 'figma' ? 'bg-orange-500' : 'bg-blue-600'
          }`}>
            {job.logo === 'amazon' ? 'a' :
             job.logo === 'tesla' ? 'T' :
             job.logo === 'figma' ? '💡' : 'a'}
          </div>
          <div>
            <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 mb-1">
              {job.postedDays}
            </Badge>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{job.title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span>{job.experience}</span>
          <span className="mx-2">•</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            job.isOnsite ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {job.isOnsite ? 'Onsite' : 'Remote'}
          </span>
          <span className="mx-2">•</span>
          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
            {job.type === 'FullTime' ? 'Full Time' : job.type}
          </span>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-4 line-clamp-3">
        {job.description}
      </div>
      
      <Button 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg h-10"
      >
        Apply Now
      </Button>
    </div>
  );
};
