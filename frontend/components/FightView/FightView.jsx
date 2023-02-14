import { Flex } from '@chakra-ui/react';

import useFightProvider from './hooks/useFightProvider';

import Fighters from './components/FightersView';
import AlertPopup from './components/AlertPopup';
import FightDetails from './components/FightDetails';

export default function FightView(){
  const { isRoundFinished } = useFightProvider()

  return (
    <Flex grow="1" alignItems="center" justifyContent='center'>
      {
        isRoundFinished
        ? <AlertPopup />
        : <>
            <FightDetails/>
            <Fighters/>
          </>
      }
    </Flex>
  )
}