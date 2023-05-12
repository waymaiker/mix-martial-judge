import {
  Button,
  Flex,
  IconButton,
  Text
} from '@chakra-ui/react';
import { FaPause, FaPlay } from 'react-icons/fa';

import useFightProvider from '../hooks/useFightProvider';

import FightClock from './FightClock';

export default function FightDetails (){
  const {
    setRound,
    setIsPaused,
    setRoundFinished,
    round,
    maxRound,
    isFightInProgress,
    isPaused
  } = useFightProvider()

  const textDuringTheFight = isFightInProgress ? round : maxRound
  const textAtTheEnd = "Fight Finished"

  const setWinner = () => {
    setResults(results => {
      const left = results.left.head + results.left.body + results.left.legs;
      const right = results.right.head + results.right.body + results.right.legs;

      return {
        ...results, "winner": left < right ? "right" : "left"
      }
    })
  }

  return (
    <Flex grow="1" direction="column" h="80vh" justifyContent="center" alignItems="center">
     <Text
        fontWeight="bold"
        fontSize="6xl"
        fontStyle="italic"
        mt="2"
      >
       {isFightInProgress ?  "Round " + textDuringTheFight : textAtTheEnd}
      </Text>
      <FightClock initMinutes={isFightInProgress ? 5 : 0} isPaused={isPaused} />
      <IconButton
        mb={"5"}
        onClick={() => setIsPaused(!isPaused)}
        icon={ !isPaused ? <FaPause /> : <FaPlay />}
      > Icon </IconButton>
      <Button isDisabled={!isFightInProgress} onClick={
        isFightInProgress
          ? () => {
              setRound(round => round+1)
              setRoundFinished(true)
            }
          : () => setWinner()
        }
      >
        {
          isFightInProgress
          ? round == maxRound ? "VALIDATE THE LAST ROUND" : "START THE NEXT ROUND"
          : "NOTHING TO SUBMIT"
        }
      </Button>
    </Flex>
  )
}