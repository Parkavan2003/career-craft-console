
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, MapPin, Briefcase } from 'lucide-react';

interface JobFiltersProps {
  onFilterChange: (filters: any) => void;
}

export const JobFilters = ({ onFilterChange }: JobFiltersProps) => {
  const [filters, setFilters] = useState({
    jobTitle: '',
    location: '',
    jobType: 'all',
    salaryRange: [30, 150]
  });

  const handleFilterUpdate = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white">
      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by Job Title, Role..."
            value={filters.jobTitle}
            onChange={(e) => handleFilterUpdate('jobTitle', e.target.value)}
            className="h-12 pl-12 pr-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 text-base"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Location Filter */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
            <Select value={filters.location || "all"} onValueChange={(value) => handleFilterUpdate('location', value === 'all' ? '' : value)}>
              <SelectTrigger className="h-12 pl-10 pr-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 min-w-[200px]">
                <SelectValue placeholder="Preferred Location" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Job Type Filter */}
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
            <Select value={filters.jobType} onValueChange={(value) => handleFilterUpdate('jobType', value)}>
              <SelectTrigger className="h-12 pl-10 pr-4 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 min-w-[150px]">
                <SelectValue placeholder="Job type" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-xl shadow-lg">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full Time">Full Time</SelectItem>
                <SelectItem value="Part Time">Part Time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Salary Range */}
          <div className="flex items-center space-x-3 bg-gray-50 px-4 py-3 rounded-xl min-w-[250px]">
            <span className="text-sm font-medium text-gray-700">Salary Per Month</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">₹{filters.salaryRange[0]}k</span>
              <div className="w-20">
                <Slider
                  value={filters.salaryRange}
                  onValueChange={(value) => handleFilterUpdate('salaryRange', value)}
                  max={200}
                  min={20}
                  step={10}
                  className="w-full"
                />
              </div>
              <span className="text-sm text-gray-600">₹{filters.salaryRange[1]}k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
