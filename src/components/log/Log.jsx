import { useContext } from "react";
import { UserContext } from "../Global";

export default function Log(func) {

    const {user} = useContext(UserContext);
    console.log(user);
    const time = user ? 2000 : 0

    return setTimeout(() => {
      func(true);
    }, time);
  }
  