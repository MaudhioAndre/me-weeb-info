
import React, { useState, useEffect, ReactElement } from 'react';

const CodeSplitting = (importComponent: () => Promise<{ default: React.FC }>) => {
  
  return function LoadedComponent(props: any): ReactElement {

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


