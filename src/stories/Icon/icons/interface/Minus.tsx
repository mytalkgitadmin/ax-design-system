import type { SVGProps } from 'react';
const SvgMinus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#minus_svg__a)'>
      <path
        fill='currentColor'
        d='M19 11.125a.875.875 0 0 1 0 1.75H5a.875.875 0 0 1 0-1.75z'
      />
    </g>
    <defs>
      <clipPath id='minus_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgMinus as SvgComponent };
