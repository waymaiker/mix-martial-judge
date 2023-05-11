import { useEffect } from 'react';
import { Flex, useDisclosure, Text } from '@chakra-ui/react';

import useFightProvider from './hooks/useFightProvider';

import Fighters from './components/FightersView';
import AlertPopup from './components/AlertPopup';
import FightDetails from './components/FightDetails';
import CustomModal from '../CustomModal/CustomModal';

export default function FightView(){
  const { isRoundFinished, showNotice, setShowNotice, setIsPaused } = useFightProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(()=>{
    showNotice ? onOpen() : ()=>{}
    setIsPaused(true)
  },[])

  return (
    <Flex grow="1" alignItems="center" justifyContent='center'>
      {
        showNotice
        ? <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title={"RULES"}
            customActionButton={() => {setShowNotice(false), setIsPaused(false)}}
            showButtonsActionFooter={true}
            mainButtonLabel={"OK"}
            children={<Text fontSize={"xl"}> Come on, let's find out !  </Text>}
          />
        : <></>
      }
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