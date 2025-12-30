import type { SVGProps } from 'react';
const SvgDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#down_svg__a)'>
      <path
        fill='currentColor'
        d='M4.252 9.54a.875.875 0 0 1 1.245-1.23l6.377 6.445 6.378-6.446a.876.876 0 0 1 1.245 1.23l-7 7.076a.876.876 0 0 1-1.245 0z'
      />
    </g>
    <defs>
      <clipPath id='down_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgDown as SvgComponent };
