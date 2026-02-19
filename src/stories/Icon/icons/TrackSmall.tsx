import type { SVGProps } from 'react';
const SvgNametrackSizesmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 16 16'
    {...props}
  >
    <circle cx={4} cy={12} r={2} stroke='currentColor' />
    <circle cx={12} cy={10} r={2} stroke='currentColor' />
    <path
      stroke='currentColor'
      d='M6 12V4.447a1 1 0 0 1 .757-.97l6-1.5a1 1 0 0 1 1.243.97V10'
    />
  </svg>
);
export { SvgNametrackSizesmall as SvgComponent };
