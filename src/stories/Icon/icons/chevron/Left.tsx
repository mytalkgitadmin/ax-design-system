import type { SVGProps } from 'react';
const SvgLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#left_svg__a)'>
      <path
        fill='currentColor'
        d='M14.456 3.894a.876.876 0 0 1 1.238 1.238l-6.957 6.957 6.792 6.792a.876.876 0 0 1-1.237 1.238L6.88 12.71a.876.876 0 0 1 0-1.238z'
      />
    </g>
    <defs>
      <clipPath id='left_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgLeft as SvgComponent };
