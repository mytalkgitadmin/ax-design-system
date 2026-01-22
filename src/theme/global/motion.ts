/**
 * Motion theme definition
 * Defines animation characteristics for different brands
 */

export type MotionTheme = {
  hover: string;
  click: string;
  entrance: string;
  transition: {
    fast: string;
    normal: string;
    slow: string;
  };
  modalType: 'default' | 'bouncy' | 'slide';
};

export const motionTheme: MotionTheme = {
  // Default: Quick & Snappy
  hover: 'all 0.2s ease-out',
  click: 'scale(0.98)',
  entrance: 'opacity 0.3s ease-out, transform 0.3s ease-out',
  transition: {
    fast: '0.15s ease-out',
    normal: '0.25s ease-out',
    slow: '0.4s ease-out',
  },
  modalType: 'default', // Standard Zoom
};
