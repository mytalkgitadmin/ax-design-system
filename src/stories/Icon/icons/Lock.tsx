import type { SVGProps } from 'react';
const SvgNamelockFillFalse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <rect
      width={18}
      height={12}
      x={3}
      y={10}
      stroke='currentColor'
      strokeWidth={1.5}
      rx={3}
    />
    <circle cx={12} cy={16} r={2} stroke='currentColor' strokeWidth={1.5} />
    <path stroke='currentColor' strokeWidth={1.5} d='M8 10V6a4 4 0 1 1 8 0v4' />
  </svg>
);
export { SvgNamelockFillFalse as SvgComponent };
