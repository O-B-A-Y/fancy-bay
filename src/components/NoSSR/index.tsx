import React, { useEffect, useState } from 'react';

interface NoSSRProps {}

const NoSSR: React.FC<NoSSRProps> = ({ children }) => {
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return <>{isMounted ? children : null}</>;
};

export default NoSSR;
