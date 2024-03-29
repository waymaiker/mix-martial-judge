import { useEffect, useState } from 'react';
import { Flex, Image } from '@chakra-ui/react';

import useFightProvider from '../hooks/useFightProvider';

import LeftFighter from './FighterLeft';
import FighterRight from './FighterRight';

export default function FightersView() {
  const {
    headRight, setHeadRight,
    bodyRight, setBodyRight,
    legsRight, setLegsRight,
    headLeft, setHeadLeft,
    bodyLeft, setBodyLeft,
    legsLeft, setLegsLeft,
    round, fightType, setUserFightResults
  } = useFightProvider()

  const reset = () => {
    setHeadRight(0)
    setBodyRight(0)
    setLegsRight(0)
    setHeadLeft(0)
    setBodyLeft(0)
    setLegsLeft(0)
  }

  useEffect(()=>{}, [
    headRight,
    bodyRight,
    legsRight,
    headLeft,
    bodyLeft,
    legsLeft
  ])

  useEffect(()=>{
    setUserFightResults(userFightResults => {
      return  {
        "left": {
          "head":userFightResults.left.head + headLeft,
          "body":userFightResults.left.body + bodyLeft,
          "legs":userFightResults.left.legs + legsLeft
        },
        "right": {
          "head":userFightResults.right.head + headRight,
          "body":userFightResults.right.body + bodyRight,
          "legs":userFightResults.right.legs + legsRight
        },
        winner: ""
      }
    })
    reset()
  }, [round])

  return (
    <Flex grow="1" h="82vh" direction="column">
      <InformationPart fightType={fightType} round={round} />
      <FightersPart
        headLeft={headLeft}
        bodyLeft={bodyLeft}
        legsLeft={legsLeft}
        setHeadLeft={setHeadLeft}
        setBodyLeft={setBodyLeft}
        setLegsLeft={setLegsLeft}
        headRight={headRight}
        bodyRight={bodyRight}
        legsRight={legsRight}
        setHeadRight={setHeadRight}
        setBodyRight={setBodyRight}
        setLegsRight={setLegsRight}
      />
    </Flex>
  )
}

const InformationPart = ({fightType, round}) => {
  return (
    <Flex justifyContent="center" mt="2%"  mb="2%">
        <Image
        src={
          fightType
          ? '/regular.png'
          : '/championship.png'
        }
        mr="5"
      />
    </Flex>
  )
}

const FightersPart = ({
  headLeft,
  bodyLeft,
  legsLeft,
  setHeadLeft,
  setBodyLeft,
  setLegsLeft,
  headRight,
  bodyRight,
  legsRight,
  setHeadRight,
  setBodyRight,
  setLegsRight,
}) => {
  return (
    <Flex justifyContent="center">
      <LeftFighter
        headLeft={headLeft}
        bodyLeft={bodyLeft}
        legsLeft={legsLeft}
        setHeadLeft={setHeadLeft}
        setBodyLeft={setBodyLeft}
        setLegsLeft={setLegsLeft}
      />
      <FighterRight
        headRight={headRight}
        bodyRight={bodyRight}
        legsRight={legsRight}
        setHeadRight={setHeadRight}
        setBodyRight={setBodyRight}
        setLegsRight={setLegsRight}
      />
    </Flex>
  )
}