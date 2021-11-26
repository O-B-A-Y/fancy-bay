import { useEffect } from 'react';

const useEffectOnce = (effect: React.EffectCallback) => useEffect(effect, []);

export default useEffectOnce;
