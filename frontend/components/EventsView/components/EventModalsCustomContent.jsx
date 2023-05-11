import { Text } from "@chakra-ui/react"

import CreateFightToken from "./CreateTokenFight"
import CustomModal from "@/components/CustomModal/CustomModal"
import FightAccess from "@/components/FightView/components/FightAccess"

export const EventsModalsCustomContent = ({type, isOpen, onClose, getAccess, setWinner}) => {
  switch (type) {
    case "create token":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Create a token for this fight"}
        isCustomSize={true}
        showButtonsActionFooter={false}
        children={<CreateFightToken onClose={onClose} />}
      />
    case "getAccess":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Get access to this fight"}
        mainButtonLabel={"VALIDATE"}
        showButtonsActionFooter={true}
        customActionButton={getAccess}
        children={<FightAccess/>}
      />
    case "ads":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"ADS"}
        showButtonsActionFooter={true}
        mainButtonLabel={"SUBSCRIBE"}
        children={<Text fontSize={"xl"}> ADVERTISEMENT SPACE FOR OUR STREAMING PLATFORM </Text>}
      />
    case "superAdmin":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Information"}
        showButtonsActionFooter={true}
        children={<Text fontSize={"xl"}> As a SuperAdmin you dont have access to this feature, contact an admin </Text>}
      />
    case "setWinners":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Who is the Winner ?"}
        customActionButton={setWinner}
        showButtonsActionFooter={true}
        mainButtonLabel={"OK"}
        children={<Text fontSize={"xl"}> Come on, let's find out !  </Text>}
      />
    default:
      break;
  }
}