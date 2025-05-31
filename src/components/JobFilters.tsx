
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { MapPin } from 'lucide-react';

interface JobFiltersProps {
  onFilterChange: (filters: any) => void;
}

export const JobFilters = ({ onFilterChange }: JobFiltersProps) => {
  const [filters, setFilters] = useState({
    jobTitle: '',
    location: '',
    jobType: 'all',
    salaryRange: [50, 80]
  });

  const handleFilterUpdate = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Search by Job Title, Role...</label>
          <Input
            placeholder="Search by Job Title, Role..."
            value={filters.jobTitle}
            onChange={(e) => handleFilterUpdate('jobTitle', e.target.value)}
            className="h-10"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Preferred Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Preferred Location"
              value={filters.location}
              onChange={(e) => handleFilterUpdate('location', e.target.value)}
              className="h-10 pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Job Type</label>
          <Select value={filters.jobType} onValueChange={(value) => handleFilterUpdate('jobType', value)}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="FullTime">Full Time</SelectItem>
              <SelectItem value="PartTime">Part Time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">Salary Per Month</label>
            <span className="text-sm text-gray-600">₹{filters.salaryRange[0]}k - ₹{filters.salaryRange[1]}k</span>
          </div>
          <div className="px-2">
            <Slider
              value={filters.salaryRange}
              onValueChange={(value) => handleFilterUpdate('salaryRange', value)}
              max={100}
              min={20}
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
