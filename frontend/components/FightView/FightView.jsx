import { useEffect } from 'react';
import { Flex, useDisclosure, Text } from '@chakra-ui/react';

import useNavigationProvider from '@/hooks/useNavigationProvider';
import useFightProvider from './hooks/useFightProvider';

import Fighters from './components/FightersView';
import AlertPopup from './components/AlertPopup';
import FightDetails from './components/FightDetails';
import CustomModal from '../CustomModal/CustomModal';
import NoticePopupContent from './components/NoticePopupContent';

export default function FightView(){
  const { setCurrentPage } = useNavigationProvider()
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
            customSize={'3xl'}
            customMainButtonAction={() => {setShowNotice(false), setIsPaused(false)}}
            customCancelButtonAction={() => { setCurrentPage("events") }}
            mainButtonLabel={"OK"}
            showButtonsActionFooter={true}
            children={<NoticePopupContent/>}
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