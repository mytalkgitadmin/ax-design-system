import type { SVGProps } from 'react';
const SvgNamemoneyFillFalse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M19.5 8.25a2.25 2.25 0 0 1 2.25 2.25v7a2.25 2.25 0 0 1-2.25 2.25h-13a2.25 2.25 0 0 1-2.25-2.25V16h1.5v1.5c0 .414.336.75.75.75h13a.75.75 0 0 0 .75-.75v-7a.75.75 0 0 0-.75-.75H18v-1.5z'
    />
    <circle
      cx={10.5}
      cy={10.5}
      r={2}
      stroke='currentColor'
      strokeWidth={1.25}
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth={1.25}
      d='M15 9v3M6 9v3'
    />
    <rect
      width={15}
      height={11}
      x={3}
      y={5}
      stroke='currentColor'
      strokeWidth={1.5}
      rx={1.5}
    />
  </svg>
);
export { SvgNamemoneyFillFalse as SvgComponent };
