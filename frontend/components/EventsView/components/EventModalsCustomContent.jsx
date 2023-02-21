import { Text } from "@chakra-ui/react"

import CreateFightToken from "./CreateTokenFight"
import CustomModal from "@/components/CustomModal/CustomModal"
import FightAccess from "@/components/FightView/components/FightAccess"

export const EventsModalsCustomContent = ({type, isOpen, onClose, customOKButton}) => {
  switch (type) {
    case "create token":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomSize={true}
        isCustomFooter={true}
        children={<CreateFightToken onClose={onClose} />}
      />
    case "join the fight":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomFooter={true}
        customOKButton={customOKButton}
        children={<FightAccess/>}
      />
    case "ads":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomFooter={false}
        children={<Text fontSize={"xl"}> ADVERTISEMENT SPACE FOR OUR STREAMING PLATFORM </Text>}
      />
    case "superAdmin":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomFooter={true}
        children={<Text fontSize={"xl"}> As a SuperAdmin you dont have access to this feature, contact an admin </Text>}
      />
    case "connect":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomFooter={false}
        children={<Text fontSize={"xl"}> Come on! <Text>Connect and buy a ticket.</Text></Text>}
      />
    default:
      break;
  }
}