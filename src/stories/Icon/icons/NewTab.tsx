import type { SVGProps } from 'react';
const SvgNamenewTab = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth={1.5}
      d='M11.308 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.1'
    />
    <path
      fill='currentColor'
      d='M21.192 2.62a.75.75 0 0 1 .75.75v4.736a.75.75 0 0 1-1.5 0V5.142l-7.93 7.407a.75.75 0 0 1-1.024-1.097l7.853-7.333h-2.886a.75.75 0 0 1 0-1.5z'
    />
  </svg>
);
export { SvgNamenewTab as SvgComponent };
