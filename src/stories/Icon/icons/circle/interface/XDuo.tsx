import type { SVGProps } from 'react';
const SvgXDuo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#x-duo_svg__a)'>
      <path
        fill='#E3E6EE'
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10'
      />
      <path
        fill='#888E9C'
        d='M14.38 8.38A.877.877 0 0 1 15.62 9.62l-2.381 2.38 2.38 2.381a.876.876 0 0 1-1.238 1.239L12 13.238l-2.381 2.38A.876.876 0 0 1 8.38 14.38L10.761 12l-2.38-2.381A.877.877 0 0 1 9.618 8.38l2.38 2.381z'
      />
    </g>
    <defs>
      <clipPath id='x-duo_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgXDuo as SvgComponent };
