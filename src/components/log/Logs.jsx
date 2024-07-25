 const Logs = (func, user) => {
    console.log("kesini");
    console.log(user);
    const time = user ? 0 : 2000
    console.log(time);
    return setTimeout(() => {
      func(true);
    }, time);
  }
  

// export default function log(func) {
//     return setTimeout(() => {
//       func(true);
//     }, 2000);
//   }
  

export default Logs