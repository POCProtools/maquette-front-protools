import { alpha } from "@mui/material/styles"

const PRIMARY = {
  mainText: "#555B6E",
  background: "#F9FAFC",
}
const SECONDARY = {
  secondGreen: "#89B0AE",
  pressedGrey: "#F8FAF8",
}

const palette = {
  common: { black: "#000", white: "#fff" },
  primary: { main: PRIMARY.mainText },
  secondary: { main: SECONDARY.secondGreen },
  background: {
    main: PRIMARY.background,
  },
  // Definir couleur alertes erreurs etc...
}

export default palette