import axios from 'axios';
import React from 'react';

const useSendWyreAPI = () => {
  const [rates, setRates] = React.useState();

  React.useEffect(() => {
    const fetchRates = async () => {
      const r = await axios.get('https://api.sendwyre.com/v3/rates');
      setRates(r.data);
    };
    fetchRates();
  }, []);

  return { rates };
};

export default useSendWyreAPI;
