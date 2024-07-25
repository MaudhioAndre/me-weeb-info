import { worker } from "driftless";

const Logs = (func, user) => {
  const int = user ? 0 : 2000;
  return worker(() => {
    func(true);
  }, int);
};

export default Logs;
