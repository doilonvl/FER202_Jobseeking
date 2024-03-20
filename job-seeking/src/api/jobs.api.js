import axios from "axios";
import { BASE_URL } from "./config";

export const getJobs = async (searchParams) => {
  const url = `${BASE_URL}/Jobs?${
    searchParams.title ? `title=${searchParams.title}` : ""
  }${searchParams.location ? `&location=${searchParams.location}` : ""}${
    searchParams.industry ? `&industry=${searchParams.industry}` : ""
  }${searchParams.skills ? `&skills=${searchParams.skills}` : ""}${
    searchParams.jobType ? `&jobType=${searchParams.jobType}` : ""
  }${
    searchParams.salaryRange ? `&salaryRange=${searchParams.salaryRange}` : ""
  }${
    searchParams.requiredExperience
      ? `&requiredExperience=${searchParams.requiredExperience}`
      : ""
  }`;
  try {
    const response = await axios.get(url);
    const isSavedRes = await axios.get(`${BASE_URL}/SavedJobs`);

    const jobs = response.data.map((job) => {
      const isSaved = isSavedRes.data.some(
        (savedJob) => savedJob.jobId === parseInt(job.id)
      );
      return { ...job, isSaved };
    });
    return jobs;
  } catch (error) {
    console.error(error);
  }
};

export const saveJob = async (jobId) => {
  try {
    await axios.post(`${BASE_URL}/SavedJobs`, { jobId });
  } catch (error) {
    console.error(error);
  }
};

export const unsaveJob = async (jobId) => {
  try {
    const response = await axios.get(`${BASE_URL}/SavedJobs`);
    const savedJobToDelete = response.data.find(
      (savedJob) => savedJob.jobId === jobId
    );

    if (savedJobToDelete) {
      await axios.delete(`${BASE_URL}/SavedJobs/${savedJobToDelete.id}`);
    }
  } catch (error) {
    console.error(error);
  }
};
