export const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

export const variantItem = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
    },
  }),
  hidden: { opacity: 0, y: -100 },
}

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5
    }
  }
}

export const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

export const show = {
  opacity: 1,
  display: "block"
};

export const hide = {
  opacity: 0,
  transitionEnd: {
    display: "none"
  }
};