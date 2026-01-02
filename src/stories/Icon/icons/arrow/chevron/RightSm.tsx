import type { SVGProps } from 'react';
const SvgRightSm = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#right-sm_svg__a)'>
      <path
        fill='currentColor'
        d='M10.805 6.387a.877.877 0 0 0-1.238 1.238l4.435 4.436-4.325 4.326a.876.876 0 0 0 1.237 1.238l4.946-4.945a.876.876 0 0 0 0-1.237z'
      />
    </g>
    <defs>
      <clipPath id='right-sm_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgRightSm as SvgComponent };
