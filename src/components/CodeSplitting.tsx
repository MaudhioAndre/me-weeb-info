
import React, { useState, useEffect, ReactElement, useContext } from 'react';
import { UserContext } from './Global';

const CodeSplitting = (importComponent: () => Promise<{ default: React.FC }>) => {
  return function LoadedComponent(props: any): ReactElement {
    const {IsCodeSplitting} = useContext(UserContext);
    IsCodeSplitting(true);
    const [Component, setComponent] = useState<React.FC | null>(null);
    useEffect(() => {
      importComponent().then((module) => {
        setComponent(() => module.default);
      });
    }, []);
    return Component ? <Component {...props} /> : <p>Loading...</p>;
  };
};
export default CodeSplitting


