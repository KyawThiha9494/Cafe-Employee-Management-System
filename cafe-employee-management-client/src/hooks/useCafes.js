import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCafes = async () => {
    const { data } = await axios.get('https://localhost:7099/api/Cafes/GetCafes');
    console.log("API Data - "+ JSON.stringify(data));
    return data;
  };
  
  export const useCafes = () => {
    return useQuery({
      queryKey: ['cafes'],
      queryFn: fetchCafes,
    });
  };