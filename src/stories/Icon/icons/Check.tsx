import type { SVGProps } from 'react';
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#check_svg__a)'>
      <path
        fill='currentColor'
        d='M18.108 7.38a.876.876 0 0 1 1.238 1.24l-8.485 8.484a.876.876 0 0 1-1.237 0l-4.243-4.243a.876.876 0 0 1 1.238-1.237l3.623 3.623z'
      />
    </g>
    <defs>
      <clipPath id='check_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgCheck as SvgComponent };
