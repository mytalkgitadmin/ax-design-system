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
        d='M12 3.13c.484 0 .876.392.876.875V17.87l5.503-5.561a.875.875 0 0 1 1.244 1.231l-7 7.075a.877.877 0 0 1-1.244 0l-7-7.076a.875.875 0 0 1 1.244-1.23l5.503 5.561V4.005c0-.483.392-.875.875-.875'
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
