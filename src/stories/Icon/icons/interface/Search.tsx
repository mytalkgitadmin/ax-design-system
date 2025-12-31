import type { SVGProps } from 'react';
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#search_svg__a)'>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M10.354 1.979a7.875 7.875 0 0 1 6.15 12.788l4.76 4.76a.875.875 0 1 1-1.237 1.238l-4.76-4.76a7.875 7.875 0 1 1-4.913-14.026m0 1.75a6.125 6.125 0 1 0 0 12.25 6.125 6.125 0 0 0 0-12.25'
        clipRule='evenodd'
      />
    </g>
    <defs>
      <clipPath id='search_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgSearch as SvgComponent };
