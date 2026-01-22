import { createVar, style } from '@vanilla-extract/css';

import { color, spacing } from '../../../tokens';

// CSS 변수 정의
// Motion Vars
const motionHoverVar = createVar();
const motionEntranceVar = createVar();
const motionClickVar = createVar(); // Transform on click
const cardBorderRadiusVar = createVar();

export const motionVars = {
  hover: motionHoverVar,
  entrance: motionEntranceVar,
  click: motionClickVar,
};

export const container = style({
  width: '100%',
  minHeight: '100vh',
  backgroundColor: color.bg.default,
  transition: 'background-color 0.3s ease',
});

export const themeSwitcher = style({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  backgroundColor: color.bg.default,
  padding: spacing[8],
  marginBottom: spacing[32],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: spacing[16],
  borderBottom: `1px solid ${color.border.default}`,
});

export const heroSection = style({
  padding: `${spacing[32]} ${spacing[24]}`,
  marginBottom: spacing[64],
  animation: `${motionEntranceVar}`,
});

export const heroShowcase = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing[24],
  maxWidth: '1200px',
  width: '100%',
  marginTop: spacing[24],

  '@media': {
    '(max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const heroColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[16],
  minWidth: 0, // Prevent content overflow in grid
});

export const heroComponentCard = style({
  padding: `${spacing[40]} ${spacing[24]}`,
  borderRadius: cardBorderRadiusVar,
  border: `1px solid ${color.border.default}`,
  transition: motionHoverVar,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[16],
});

export const profileCard = style({
  marginTop: spacing[8],
  border: `1px solid ${color.border.default}`,
  borderRadius: cardBorderRadiusVar,
  padding: spacing[16],
  transition: motionHoverVar,
});

export const actionArea = style({
  marginTop: spacing[8],
});

export const sectionTitle = style({
  marginBottom: spacing[4],
});

export const description = style({
  marginBottom: spacing[12],
});

export const marginBottom16 = style({
  marginBottom: spacing[16],
});

export const demoVars = {
  cardBorderRadius: cardBorderRadiusVar,
  ...motionVars,
};

export const metricsSection = style({
  padding: `${spacing[48]} ${spacing[24]}`,
  marginBottom: spacing[64],
  backgroundColor: color.bg.subtle,
  borderRadius: '16px',
});

export const metricsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: spacing[24],
  maxWidth: '1200px',
  margin: '0 auto',
});

export const metricCard = style({
  backgroundColor: color.bg.default,
  borderRadius: '12px',
  border: `1px solid ${color.border.default}`,
  transition: motionHoverVar,

  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 24px ${color.bg.dim}`,
  },
  ':active': {
    transform: motionClickVar,
  },
});

export const showcaseSection = style({
  maxWidth: '1200px',
  margin: '0 auto',

  borderRadius: '16px',
  marginBottom: spacing[64],
});

export const showcaseItem = style({
  padding: spacing[32],
  marginBottom: spacing[32],
  backgroundColor: color.bg.default,
  border: `1px solid ${color.border.default}`,
  borderRadius: '12px',
  transition: motionHoverVar,

  selectors: {
    '&:not(:last-child)': {
      marginBottom: spacing[32],
    },
  },
});

export const formGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: spacing[16],
  marginTop: spacing[16],
});

export const selectionGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: spacing[32],
  marginTop: spacing[16],
});

export const bg = style({
  padding: `${spacing[64]} ${spacing[24]}`,

  backgroundColor: color.bg.subtle,
});
