import { Flex, Image, Text, GridItem } from '@chakra-ui/react';
import CardButton from '@/components/EventsView/components/CardButton';

import { AnimationZoomItem } from '@/utils/animations';

export default function ItemMarketPlace({
  nftImage,
  title,
  price,
  nbForSale,
  isLoading,
  isDisabled,
  typeOfview
}) {
  const addButton = () => {
    return <CardButton
      title={"Add"}
      customPadding={typeOfview ? 1 : 0}
      isLoading={isLoading}
      isDisabled={isLoading || isDisabled}
      secondaryAction={() => {}}
    />
  }

  const buyButton = () => {
    return <CardButton
      title={"Buy"}
      customPadding={typeOfview ? 1 : 0}
      isLoading={isLoading}
      isDisabled={isLoading || isDisabled}
      secondaryAction={() => {}}
    />
  }

  return (
    <AnimationZoomItem>
      <GridItem p="15px" borderRadius="15px">
        <Flex direction="column">
          <Image
            borderTopRadius={"15px"}
            objectFit='contain'
            src={nftImage}
            alt='ufc-fighters'
          />
          <Flex direction="column" p="5" shadow={"2xl"} borderRadius={"15px"}>
            <Text fontWeight="extrabold" fontSize="md">{title}</Text>
            <Text fontWeight="extrabold" color="gray.500" fontSize="xs">{nbForSale} for sale</Text>
            <Flex mt="2" justifyContent='space-between' alignItems={'center'}>
              <Flex mt="2" alignItems={'center'}>
                <Text color="gray.500" fontSize="sm" mr='10px'> From </Text>
                <Text fontWeight="extrabold"> {price} </Text>
              </Flex>
              <Flex
                mt="2"
                w={typeOfview ? "45%" : "50%"}
                justifyContent="space-between"
                alignItems={'center'}
              >
                {addButton()}
                {buyButton()}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
    </AnimationZoomItem>
  )
}