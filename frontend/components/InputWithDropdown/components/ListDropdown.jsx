import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";

import { visibleCities } from "@/utils/cities";

import { DropdownItem } from "./DropdownItem"

export const ListDropdown = ({input, setInput}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(visibleCities(input));
  }, [input]);

  return (
    <Flex
      position={'absolute'}
      direction={'column'}
      backgroundColor={'white'}
      border={'1px'}
      borderColor={'gray.200'}
      borderTop={'0px'}
      borderBottom={'0px'}
      borderBottomRadius={'6px'}
      maxH={'200px'}
      w={"100%"}
      overflow={"auto"}
    >
    {
      list.map((e, index) =>
        e.text == input && list.length == 1
        ? <></>
        : <DropdownItem
            key={index}
            index={index}
            last={index == list.length-1}
            text={e.text}
            setInput={setInput}
            closeDropdownList={setList}
          />
      )
    }
    </Flex>
  )
}
