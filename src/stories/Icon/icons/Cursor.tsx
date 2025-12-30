import type { SVGProps } from 'react';
const SvgCursor = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 2 24'
    {...props}
  >
    <g clipPath='url(#cursor_svg__a)'>
      <path
        fill='currentColor'
        d='M1 .125c.483 0 .875.392.875.875v22a.875.875 0 0 1-1.75 0V1C.125.517.517.125 1 .125'
      />
    </g>
    <defs>
      <clipPath id='cursor_svg__a'>
        <path fill='#fff' d='M0 0h2v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgCursor as SvgComponent };
