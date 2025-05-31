
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

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateJobModal = ({ isOpen, onClose }: CreateJobModalProps) => {
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
  const [showJobTypeDropdown, setShowJobTypeDropdown] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
  };

  const handlePublish = () => {
    console.log('Publishing job:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Create Job Opening</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Job Title</label>
              <Input
                placeholder="Full Stack Developer"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Company Name</label>
              <Input
                placeholder="Amazon, Microsoft, Swiggy"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Preferred Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chennai">Chennai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Job Type</label>
              <div className="relative">
                <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="FullTime" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="fulltime">Full Time</SelectItem>
                    <SelectItem value="parttime">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Salary Range</label>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <Input
                    placeholder="70"
                    value={formData.salaryFrom}
                    onChange={(e) => handleInputChange('salaryFrom', e.target.value)}
                    className="pl-8"
                  />
                </div>
                <span className="text-gray-500">-</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <Input
                    placeholder="1,20,00,000"
                    value={formData.salaryTo}
                    onChange={(e) => handleInputChange('salaryTo', e.target.value)}
                    className="pl-8"
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
                      "w-full justify-start text-left font-normal",
                      !deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Job Description</label>
            <Textarea
              placeholder="Please share a description to let the candidate know more about the job role"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={handleSaveDraft}
              className="px-8"
            >
              Save Draft ⇂
            </Button>
            <Button 
              onClick={handlePublish}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
            >
              Publish ⇃
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
