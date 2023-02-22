import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"

export default function CustomModal({ mainButtonLabel, isOpen, onClose, children, customActionButton, isCustomSize, isCustomLabel, isCustomFooter }) {
  const customButton = customActionButton == undefined ? () => onClose() : () => onClickCustomButton()
  const buttonLabel = mainButtonLabel === undefined ? <Text>Register</Text> : <Text>{mainButtonLabel}</Text> 
  const onClickCustomButton = () => {
    onClose()
    customActionButton()
  }

  return (
    <Modal size={isCustomSize ? '6xl' : 'md'} blockScrollOnMount={true} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        
        {
          isCustomFooter 
          ? <ModalFooter>
              <Button
                colorScheme='red'
                mr={3}
                onClick={() => customButton()}
              >
                {
                  isCustomLabel
                  ? <Text>YES</Text>
                  :  buttonLabel
                }
              </Button>
              <Button
                onClick={onClose}
                variant='ghost'
              >
                Cancel
              </Button>
            </ModalFooter>
          : <ModalFooter>
              <Button
                colorScheme='red'
                mr={3}
                onClick={onClose}
              >
                REGISTER
              </Button>
              <Button
                onClick={onClose}
                variant='ghost'
              >
                Cancel
              </Button>
            </ModalFooter>
        }

      </ModalContent>
    </Modal>
  )
}