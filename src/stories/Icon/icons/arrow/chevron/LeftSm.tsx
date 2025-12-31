import type { SVGProps } from 'react';
const SvgLeftSm = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#left-sm_svg__a)'>
      <path
        fill='currentColor'
        d='M13.197 6.387a.877.877 0 0 1 1.238 1.238l-4.436 4.436 4.325 4.326a.876.876 0 0 1-1.237 1.238L8.142 12.68a.876.876 0 0 1 0-1.237z'
      />
    </g>
    <defs>
      <clipPath id='left-sm_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgLeftSm as SvgComponent };
