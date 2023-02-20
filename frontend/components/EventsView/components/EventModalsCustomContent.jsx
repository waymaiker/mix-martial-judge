import { Text } from "@chakra-ui/react"

import CreateFightToken from "./CreateTokenFight"
import CustomModal from "@/components/CustomModal/CustomModal"
import FightAccess from "@/components/FightView/components/FightAccess"

export const EventsModalsCustomContent = ({type, isOpen, onClose}) => {
  switch (type) {
    case "create token":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomSize={true}
        isCustomFooter={true}
        children={<CreateFightToken onClose={onClose} />}
      />    
    case "fight access":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomFooter={false}
        children={<FightAccess />}
      />    
    case "ads":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomFooter={false}
        children={<Text color={"green"}> ADVERTISEMENT SPACE FOR OUR STREAMING PLATFORM </Text>}
      />
    case "superAdmin":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomFooter={true}
        children={<Text color={"green"}> As a SuperAdmin you dont have access to this feature, contact an admin </Text>}
      />    
    default:
      break;
  }
}