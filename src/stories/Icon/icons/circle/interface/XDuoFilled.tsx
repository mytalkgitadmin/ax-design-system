import type { SVGProps } from 'react';
const SvgXDuoFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#x-duo-filled_svg__a)'>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m2.38 6.38a.877.877 0 0 1 1.24 1.24l-2.381 2.38 2.38 2.381a.876.876 0 0 1-1.238 1.239L12 13.238l-2.381 2.38A.876.876 0 0 1 8.38 14.38L10.761 12l-2.38-2.381A.877.877 0 0 1 9.618 8.38l2.38 2.381z'
        clipRule='evenodd'
      />
    </g>
    <defs>
      <clipPath id='x-duo-filled_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgXDuoFilled as SvgComponent };
