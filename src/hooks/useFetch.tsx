import React, {useEffect, useState} from 'react';

const useFetch = ({limit}: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${limit}`,
      );
      const data = await response.json();
      setData(data?.results);
    } catch (error) {
      throw error;
    }
  };
  return data;
};

export default useFetch;
