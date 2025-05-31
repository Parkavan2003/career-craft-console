
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Job {
  id: string;
  job_title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary_min: number | null;
  salary_max: number | null;
  job_description: string | null;
  requirements: string | null;
  responsibilities: string | null;
  application_deadline: string | null;
  created_at: string;
}

export interface CreateJobData {
  job_title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary_min?: number;
  salary_max?: number;
  job_description?: string;
  requirements?: string;
  responsibilities?: string;
  application_deadline?: string;
}

export const useJobs = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      console.log('Fetching jobs from Supabase...');
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }

      console.log('Fetched jobs:', data);
      return data as Job[];
    },
  });

  const createJobMutation = useMutation({
    mutationFn: async (jobData: CreateJobData) => {
      console.log('Creating job with data:', jobData);
      
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) {
        console.error('Error creating job:', error);
        throw error;
      }

      console.log('Job created successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Success",
        description: "Job published successfully!",
      });
    },
    onError: (error) => {
      console.error('Error in createJobMutation:', error);
      toast({
        title: "Error",
        description: "Failed to publish job. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    jobs: jobs || [],
    isLoading,
    error,
    createJob: createJobMutation.mutate,
    isCreating: createJobMutation.isPending,
  };
};
