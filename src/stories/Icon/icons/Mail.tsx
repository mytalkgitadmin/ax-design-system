import type { SVGProps } from 'react';
const SvgNamemailFillFalse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <rect
      width={18}
      height={14}
      x={3}
      y={5}
      stroke='currentColor'
      strokeWidth={1.5}
      rx={3}
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth={1.5}
      d='m6 9 4.89 3.26a2 2 0 0 0 2.22 0L18 9'
    />
  </svg>
);
export { SvgNamemailFillFalse as SvgComponent };
