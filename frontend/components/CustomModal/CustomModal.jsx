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

export default function CustomModal({ isOpen, onClose, children, customOKButton, isCustomSize, isCustomFooter }) {
  const customButton = customOKButton == undefined ? () => onClose() : () => onClickCustomButton()
  const onClickCustomButton = () => {
    onClose()
    customOKButton()
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
        <ModalFooter>
          <Button
            colorScheme='red'
            mr={3}
            onClick={() => customButton()}
          >
            {
            isCustomFooter
              ? <Text>YES</Text>
              : <Text> Register </Text>
            }
          </Button>
          <Button
            onClick={onClose}
            variant='ghost'
          >
            Cancel
          </Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}