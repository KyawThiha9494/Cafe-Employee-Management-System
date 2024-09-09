import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchEmployees = async () => {
    const { data } = await axios.get('https://localhost:7099/api/Employee/GetEmployees');
    console.log("API Data - "+ JSON.stringify(data));
    return data;
  };
  
  export const useEmployees = () => {
    return useQuery({
      queryKey: ['employees'],
      queryFn: fetchEmployees,
    });
  };