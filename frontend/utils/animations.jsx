import { motion } from 'framer-motion';

export const AnimationZoomListItem = ({children}) => {
  return <motion.li whileHover={{
    scale: 1.1,
    transition: { duration: .2 }
  }}>
    {children}
  </motion.li>
}

export const AnimationZoomItem = ({children}) => {
  return <motion.div whileHover={{
    scale: 1.1,
    transition: { duration: .2 }
  }}>
    {children}
  </motion.div>
}
export const AnimationContentFadeIn = ({children}) => {
  return <motion.div
    initial='hidden'
    animate='visible'
    variants={{
      hidden: {
        scale: .8,
        opacity: 0
      },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          delay: .4
        }
      }
    }}
  >
    {children}
  </motion.div>
}
