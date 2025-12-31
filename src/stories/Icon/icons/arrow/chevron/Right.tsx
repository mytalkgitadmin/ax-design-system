import type { SVGProps } from 'react';
const SvgRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#right_svg__a)'>
      <path
        fill='currentColor'
        d='M9.544 3.894a.876.876 0 0 0-1.238 1.238l6.957 6.957-6.792 6.792a.876.876 0 0 0 1.237 1.238l7.411-7.41a.876.876 0 0 0 0-1.238z'
      />
    </g>
    <defs>
      <clipPath id='right_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgRight as SvgComponent };
