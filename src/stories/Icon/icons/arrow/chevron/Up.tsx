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
        d='M4.252 14.465a.875.875 0 0 0 1.244 1.23l6.378-6.446 6.378 6.447a.876.876 0 0 0 1.244-1.23l-7-7.076a.876.876 0 0 0-1.244 0z'
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
