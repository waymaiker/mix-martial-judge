import { 
  Button, 
  Text,
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay,
} from "@chakra-ui/react"

export default function CustomModal({ isOpen, onClose, children }) {
  return (
    <Modal blockScrollOnMount={true} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='red' mr={3} onClick={onClose}> Register </Button>
          <Button variant='ghost'> Cancel </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}