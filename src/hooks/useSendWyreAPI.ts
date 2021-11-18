import axios from 'axios';
import React from 'react';

const useSendWyreAPI = () => {
  const [rates, setRates] = React.useState();
  const [retries, setRetries] = React.useState(5);

  React.useEffect(() => {
    const fetchRates = async () => {
      if (retries > 0) {
        try {
          const r = await axios.get('https://api.sendwyre.com/v3/rates');
          setRates(r.data);
        } catch (error) {
          console.error(error);
          setRetries(retries - 1);
        }
      }
    };
    fetchRates();
  }, [retries]);

  return { rates };
};

export default useSendWyreAPI;
