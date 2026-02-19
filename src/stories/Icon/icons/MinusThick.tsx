import type { SVGProps } from 'react';
const SvgNameminusThickTrue = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2.5}
      d='M4 12h16'
    />
  </svg>
);
export { SvgNameminusThickTrue as SvgComponent };
