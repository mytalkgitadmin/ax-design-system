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
        d='M15.398 14.875c1.378 0 2.131-1.607 1.25-2.665L13.44 8.36a1.876 1.876 0 0 0-2.88 0l-3.207 3.85c-.882 1.058-.129 2.664 1.249 2.664z'
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
