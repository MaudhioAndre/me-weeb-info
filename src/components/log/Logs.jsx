import { setDriftlessInterval } from "driftless";

const Logs = (func, user) => {
    const int = user ? 0 : 3000;
    return setDriftlessInterval(() => {
      func(true);
    }, int);
  };

  export default Logs;
