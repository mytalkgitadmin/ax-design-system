import type { SVGProps } from 'react';
const SvgLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g fill='currentColor' clipPath='url(#left_svg__a)'>
      <path d='M10.457 3.893a.876.876 0 0 1 1.237 1.238l-6.08 6.082H20a.875.875 0 0 1 0 1.75H5.613l5.917 5.917a.876.876 0 0 1-1.238 1.239l-7.411-7.411a.876.876 0 0 1 0-1.238z' />
      <path d='M10.457 3.893a.876.876 0 0 1 1.237 1.238l-6.08 6.082H20a.875.875 0 0 1 0 1.75H5.613l5.917 5.917a.876.876 0 0 1-1.238 1.239l-7.411-7.411a.876.876 0 0 1 0-1.238z' />
    </g>
    <defs>
      <clipPath id='left_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgLeft as SvgComponent };
