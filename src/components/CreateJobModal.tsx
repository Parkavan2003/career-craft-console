
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useJobs } from '@/hooks/useJobs';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateJobModal = ({ isOpen, onClose }: CreateJobModalProps) => {
  const { createJob, isCreating } = useJobs();
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: '',
    salaryFrom: '',
    salaryTo: '',
    description: '',
    requirements: '',
    responsibilities: '',
  });
  const [deadline, setDeadline] = useState<Date>();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
  };

  const handlePublish = () => {
    console.log('Publishing job:', formData);
    
    const jobData = {
      job_title: formData.jobTitle,
      company_name: formData.companyName,
      location: formData.location,
      job_type: formData.jobType,
      salary_min: formData.salaryFrom ? parseInt(formData.salaryFrom.replace(/[₹,]/g, '')) : undefined,
      salary_max: formData.salaryTo ? parseInt(formData.salaryTo.replace(/[₹,]/g, '')) : undefined,
      job_description: formData.description || undefined,
      requirements: formData.requirements || undefined,
      responsibilities: formData.responsibilities || undefined,
      application_deadline: deadline ? format(deadline, 'yyyy-MM-dd') : undefined,
    };

    createJob(jobData);
    
    setFormData({
      jobTitle: '',
      companyName: '',
      location: '',
      jobType: '',
      salaryFrom: '',
      salaryTo: '',
      description: '',
      requirements: '',
      responsibilities: '',
    });
    setDeadline(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[90vh] bg-white rounded-2xl border-0 shadow-2xl p-0 overflow-hidden">
        <div className="px-8 py-6 h-full overflow-y-auto">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-xl font-semibold text-gray-900 text-center">
              Create Job Opening
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Job Title and Company Name Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Job Title</label>
                <Input
                  placeholder="Full Stack Developer"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className="h-12 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company Name</label>
                <Input
                  placeholder="Amazon, Microsoft, Swiggy"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="h-12 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Location and Job Type Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger className="h-12 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Choose Preferred Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Job Type</label>
                <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                  <SelectTrigger className="h-12 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="FullTime" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Salary Range and Application Deadline Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Salary Range</label>
                <div className="flex items-center space-x-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                    <Input
                      placeholder="70"
                      value={formData.salaryFrom}
                      onChange={(e) => handleInputChange('salaryFrom', e.target.value)}
                      className="h-12 pl-8 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                    <Input
                      placeholder="₹12,00,000"
                      value={formData.salaryTo}
                      onChange={(e) => handleInputChange('salaryTo', e.target.value)}
                      className="h-12 pl-8 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Application Deadline</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500",
                        !deadline && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                      {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border border-gray-200 rounded-lg shadow-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Job Description</label>
              <Textarea
                placeholder="Please share a description to let the candidate know more about the job role"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handleSaveDraft}
                className="px-8 py-3 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                disabled={isCreating}
              >
                Save Draft ⇂
              </Button>
              <Button 
                onClick={handlePublish}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
                disabled={isCreating || !formData.jobTitle || !formData.companyName || !formData.location || !formData.jobType}
              >
                {isCreating ? 'Publishing...' : 'Publish ⇃'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
