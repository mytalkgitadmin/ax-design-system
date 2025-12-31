import type { SVGProps } from 'react';
const SvgUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#up_svg__a)'>
      <path
        fill='currentColor'
        d='M4.378 10.464a.875.875 0 0 0 1.244 1.231l5.503-5.561V20a.875.875 0 1 0 1.75 0V6.134l5.503 5.561a.875.875 0 0 0 1.244-1.231l-7-7.075a.876.876 0 0 0-1.244 0z'
      />
    </g>
    <defs>
      <clipPath id='up_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgUp as SvgComponent };
