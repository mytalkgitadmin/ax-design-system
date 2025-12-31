import type { SVGProps } from 'react';
const SvgX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#x_svg__a)'>
      <path
        fill='currentColor'
        d='M18.62 5.38a.876.876 0 0 1-.001 1.239l-5.38 5.38 5.38 5.381a.877.877 0 0 1-1.238 1.238L12 13.238l-5.381 5.38A.876.876 0 0 1 5.38 17.38L10.762 12l-5.38-5.381A.876.876 0 0 1 6.62 5.38L12 10.76l5.38-5.38a.877.877 0 0 1 1.24 0'
      />
    </g>
    <defs>
      <clipPath id='x_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgX as SvgComponent };
