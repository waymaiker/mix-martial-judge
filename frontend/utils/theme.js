import { extendTheme } from '@chakra-ui/react'
import "@fontsource/libre-franklin"

const theme = extendTheme({
  fonts: {
    heading: `'Libre Franklin', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
})

export default theme