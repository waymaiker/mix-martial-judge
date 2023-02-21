import React, { useState, useEffect } from 'react';

import { Text } from '@chakra-ui/react';

export default function FightClock({initMinutes, isPaused}) {
  const [minutes, setMinutes] = useState(initMinutes);
  const [seconds, setSeconds] = useState(0);

  useEffect(()=>{
    let myInterval
    if(isPaused){
       myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval)
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000)
    }

    return ()=> {
      clearInterval(myInterval);
    };
  });

  return (
    <Text fontSize="9xl">
    {
      minutes === 0 && seconds === 0
        ? <> 0 : 00 </>
        : <> {minutes} : {seconds < 10 ?  `0${seconds}` : seconds} </>
    }
    </Text>
  )
}