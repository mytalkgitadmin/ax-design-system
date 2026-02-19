import type { SVGProps } from 'react';
const SvgNamehamburger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M20 16.35a.65.65 0 0 1 0 1.3H4a.65.65 0 0 1 0-1.3zm0-5a.65.65 0 0 1 0 1.3H4a.65.65 0 0 1 0-1.3zm0-5a.65.65 0 0 1 0 1.3H4a.65.65 0 0 1 0-1.3z'
    />
  </svg>
);
export { SvgNamehamburger as SvgComponent };
