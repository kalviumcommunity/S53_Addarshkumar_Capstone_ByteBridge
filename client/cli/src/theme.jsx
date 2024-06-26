import { extendTheme } from "@chakra-ui/react";
const breakpoints = {
    sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
    md: "48em", // ~768px
    lg: "70em", // ~992px
    xl: "80em", // ~1280px

  };

  const theme=extendTheme({
    breakpoints
  })

  export default theme;