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

export default function CustomModal({ mainButtonLabel, isOpen, onClose, children, customActionButton, isCustomSize, title, showButtonsActionFooter }) {
  const customButtonAction = customActionButton == undefined ? () => onClose() : () => onClickCustomButton()
  const buttonLabel = mainButtonLabel === undefined ? <Text>REGISTER</Text> : <Text>{mainButtonLabel}</Text>
  const onClickCustomButton = () => {
    onClose()
    customActionButton()
  }

  return (
    <Modal size={isCustomSize ? '6xl' : 'md'} blockScrollOnMount={true} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>

        {
          showButtonsActionFooter
          ? <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={customButtonAction}>
                {buttonLabel}
              </Button>
              <Button onClick={onClose} variant='ghost'>
                Cancel
              </Button>
            </ModalFooter>
          : <></>
        }

      </ModalContent>
    </Modal>
  )
}