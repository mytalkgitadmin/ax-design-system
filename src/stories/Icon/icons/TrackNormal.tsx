import type { SVGProps } from 'react';
const SvgNametrackSizenormal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <circle cx={6} cy={18} r={3} stroke='currentColor' strokeWidth={1.5} />
    <circle cx={18} cy={15} r={3} stroke='currentColor' strokeWidth={1.5} />
    <path
      stroke='currentColor'
      strokeWidth={1.5}
      d='M9 18V6.671a1.5 1.5 0 0 1 1.136-1.455l9-2.25A1.5 1.5 0 0 1 21 4.42V15'
    />
  </svg>
);
export { SvgNametrackSizenormal as SvgComponent };
