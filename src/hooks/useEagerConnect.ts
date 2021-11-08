import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Connector from 'src/connectors';
import { switchConnector } from 'src/states/wallet/slice';

function useEagerConnect() {
  const { activate, active } = useWeb3React();
  const dispatch = useDispatch();

  const [tried, setTried] = useState(false);

  /** Check if the injected web3 is authorized or not. */
  useEffect(() => {
    Connector.Injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        /** If it is authorized, activate the injected web3 */
        activate(Connector.Injected, undefined, true)
          .then(() => {
            dispatch(switchConnector('Injected'));
          })
          .catch(() => {
            setTried(true);
          });
      } else {
        /** Update the tried state */
        setTried(true);
      }
    });
  }, []);

  /** If the user has not tried yet, setTried */
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export default useEagerConnect;
