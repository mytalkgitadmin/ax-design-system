import type { SVGProps } from 'react';
const SvgPositiveDuo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#positive-duo_svg__a)'>
      <path
        fill='#F1FCF4'
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10'
      />
      <path
        fill='#1FA45C'
        d='M15.401 8.861a.876.876 0 0 1 1.197 1.277l-5.333 5a.876.876 0 0 1-1.197 0l-2.667-2.5a.876.876 0 0 1 1.197-1.277l2.068 1.939z'
      />
    </g>
    <defs>
      <clipPath id='positive-duo_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgPositiveDuo as SvgComponent };
