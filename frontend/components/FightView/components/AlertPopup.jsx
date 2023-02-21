import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  Text
} from '@chakra-ui/react';

import useFightProvider from '../hooks/useFightProvider';

import FightSubmission from './FightSubmission';

export default function AlertPopup() {
  const {setRoundFinished, round, maxRound} = useFightProvider()
  const roundRectified = round - 1

  const chooseAnExpression = () => {
    switch (roundRectified) {
      case 2:
        return "Perfect!"

      case 3:
        return "Good job!"

      case 4:
        return "Yeees!"

      case 5:
        return "Here we go!"

      default:
        return "Nice!"
    }
  }

  return (
    <Flex>
      <Alert
        status='success'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        p="10"
      >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          Round {roundRectified} submitted!
        </AlertTitle>
        <AlertDescription maxWidth='sm' mb="5">
         {
            roundRectified < maxRound
            ? <Flex direction="column">
                <Text> {chooseAnExpression()} Get ready, for the next one. </Text>
                <Text> Wait till the next round start to click on the button. </Text>
              </Flex>
            : <Text> The Fight is finished. Sumbit your participation and wait for the result </Text>
         }
        </AlertDescription>
        <FightSubmission
          text={ roundRectified < maxRound ? "START THE NEXT ROUND" : "SUBMIT YOUR RESULT" }
          startNextRound={() => setRoundFinished(false)}
          isFightInProgress={roundRectified < maxRound}
        />
      </Alert>
    </Flex>
  )
}