import type { SVGProps } from 'react';
const SvgNamedocumentFillFalse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeWidth={1.5}
      d='M8.571 4H7a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-1.114'
    />
    <rect
      width={8}
      height={3}
      x={8}
      y={2}
      stroke='currentColor'
      strokeWidth={1.5}
      rx={1.5}
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M8 15h4M8 9h8M8 12h8'
    />
  </svg>
);
export { SvgNamedocumentFillFalse as SvgComponent };
