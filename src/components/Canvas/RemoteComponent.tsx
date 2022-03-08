import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const RemoteComponent = ({ library, url, children, props }: any) => {
  const [Comp, setComponent] = useState<React.FC | null>(null);

  const importComponent = useCallback(() => {
    return axios.get(url).then((res) => res.data);
  }, [url]);

  const loadComp = useCallback(async () => {
    // new Function(`${await importComponent()}`)();
    window.eval(`${await importComponent()}`);
    const { default: component } = (window as any)[library];
    setComponent(() => component);
  }, [importComponent, setComponent]);

  useEffect(() => {
    loadComp();
  }, [loadComp]);

  if (Comp) {
    return <Comp {...props}>{children}</Comp>;
  }

  return null;
};

export default RemoteComponent;
