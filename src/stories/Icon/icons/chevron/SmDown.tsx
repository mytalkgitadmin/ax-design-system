import type { SVGProps } from 'react';
const SvgSmDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#sm-down_svg__a)'>
      <path
        fill='currentColor'
        d='M6.253 10.55a.875.875 0 1 1 1.244-1.23l4.378 4.426 4.378-4.425a.875.875 0 0 1 1.244 1.23l-5 5.054a.876.876 0 0 1-1.245 0z'
      />
    </g>
    <defs>
      <clipPath id='sm-down_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgSmDown as SvgComponent };
