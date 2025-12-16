import { style, createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { primitiveTokens } from "../../styles/tokens.css";

// CSS 변수 생성
const colorVar = createVar();
const bgColorVar = createVar();
const borderColorVar = createVar();

const basePaddingVar = createVar();

const baseButton = style({
  vars: {
    [basePaddingVar]: "1.2em",
  },

  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  gap: primitiveTokens.scale[8],
  justifyContent: "center",

  border: "none",
  borderRadius: primitiveTokens.scale[4],
  cursor: "pointer",
  transition: "all 0.3s ease",

  padding: `0 ${basePaddingVar}`,
  fontFamily: primitiveTokens.font.family.primary,
  fontWeight: primitiveTokens.font.weight[500],

  ":disabled": {
    opacity: primitiveTokens.opacity[60],
    color: primitiveTokens.color.gray[100],
    backgroundColor: primitiveTokens.color.blue[50],
    cursor: "not-allowed",
  },
});

export const buttonStyle = recipe({
  base: baseButton,

  variants: {
    variant: {
      solid: {
        backgroundColor: bgColorVar,
        color: colorVar,
        border: "none",
        ":hover": {
          opacity: 0.9,
        },
      },
      outline: {
        backgroundColor: "transparent",
        color: bgColorVar,
        border: `1px solid ${borderColorVar}`,
        ":hover": {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    size: {
      xs: { height: "32px", fontSize: primitiveTokens.font.size.xs },
      sm: { height: "40px", fontSize: primitiveTokens.font.size.sm },
      md: { height: "44px", fontSize: primitiveTokens.font.size.md },
      lg: { height: "52px", fontSize: primitiveTokens.font.size.lg },
    },
    full: {
      true: {
        width: "100%",
      },
    },
    withIcon: {
      true: {
        paddingLeft: `calc(${basePaddingVar} + 0.2em)`,

        "& span": {
          position: "relative",
          paddingLeft: "0.5em",

          "&::before": {
            content: "''",
            display: "block",
            width: "1px",
            height: "0.7em",
            backgroundColor: colorVar,
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
          },
        },
      },
    },
  },
});

// vars 객체 export
export const buttonVars = {
  color: colorVar,
  backgroundColor: bgColorVar,
  borderColor: borderColorVar,
};
