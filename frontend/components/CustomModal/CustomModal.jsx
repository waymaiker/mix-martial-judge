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

export default function CustomModal({ mainButtonLabel, isOpen, onClose, children, customMainButtonAction, customCancelButtonAction, customSize, title, titleFontSize, showButtonsActionFooter }) {
  const customMainButton = customMainButtonAction == undefined ? () => onClose() : () => onClickMainButton()
  const customCancelButton = customCancelButtonAction == undefined ? () => onClose() : () => onClickCancelCustomButton()
  const buttonLabel = mainButtonLabel === undefined ? <Text>REGISTER</Text> : <Text>{mainButtonLabel}</Text>
  const onClickMainButton = () => {
    onClose()
    customMainButtonAction()
  }
  const onClickCancelCustomButton = () => {
    onClose()
    customCancelButtonAction()
  }

  return (
    <Modal size={customSize != undefined ? customSize : 'md'} blockScrollOnMount={true} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader  fontSize={titleFontSize != undefined ? titleFontSize : "2xl"}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>

        {
          showButtonsActionFooter
          ? <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={customMainButton}>
                {buttonLabel}
              </Button>
              <Button onClick={customCancelButton} variant='ghost'>
                Cancel
              </Button>
            </ModalFooter>
          : <></>
        }

      </ModalContent>
    </Modal>
  )
}