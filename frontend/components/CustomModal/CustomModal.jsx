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

export default function CustomModal({ isOpen, onClose }) {
  return (
    <>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
             To access this page, you should be registered
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button 
              colorScheme='blue' 
              mr={3} 
              onClick={onClose}
            >
              Register
            </Button>
            <Button variant='ghost'> Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}