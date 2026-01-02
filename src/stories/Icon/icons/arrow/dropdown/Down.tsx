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
        d='M15.398 9.125c1.378 0 2.13 1.607 1.25 2.665l-3.208 3.849c-.75.899-2.131.899-2.88 0L7.351 11.79c-.88-1.058-.128-2.665 1.25-2.665z'
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
