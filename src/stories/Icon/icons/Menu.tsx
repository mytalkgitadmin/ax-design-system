import type { SVGProps } from 'react';
const SvgMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g fill='currentColor' clipPath='url(#menu_svg__a)'>
      <path d='M20 17.125a.875.875 0 0 1 0 1.75H4a.875.875 0 0 1 0-1.75zM20 11.125a.875.875 0 0 1 0 1.75H4a.875.875 0 0 1 0-1.75zM20 5.125a.875.875 0 0 1 0 1.75H4a.875.875 0 1 1 0-1.75z' />
    </g>
    <defs>
      <clipPath id='menu_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgMenu as SvgComponent };
