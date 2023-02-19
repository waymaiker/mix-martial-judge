import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

export default function CustomModal({ isOpen, onClose, children, isCustomSize, isCustomFooter }) {
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
          ? <ModalFooter><Button colorScheme='red' mr={3} onClick={onClose}> OK </Button> </ModalFooter>
          : <ModalFooter><Button colorScheme='red' mr={3} onClick={onClose}> Register </Button> <Button onClick={onClose} variant='ghost'> Cancel </Button></ModalFooter>
        }
      </ModalContent>
    </Modal>
  )
}