import type { SVGProps } from 'react';
const SvgNamedot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      fillRule='evenodd'
      d='M18 12c0 3.312-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6'
      clipRule='evenodd'
    />
  </svg>
);
export { SvgNamedot as SvgComponent };
