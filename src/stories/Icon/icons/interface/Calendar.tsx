import type { SVGProps } from 'react';
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#calendar_svg__a)'>
      <path
        fill='currentColor'
        d='M16 2.125c.483 0 .875.392.875.875v.125H18l.2.005A3.875 3.875 0 0 1 21.874 7v10A3.875 3.875 0 0 1 18 20.875H6A3.875 3.875 0 0 1 2.125 17V7A3.875 3.875 0 0 1 6 3.125h1.125V3a.875.875 0 1 1 1.75 0v.125h6.25V3c0-.483.392-.875.875-.875M3.875 17c0 1.174.951 2.125 2.125 2.125h12A2.125 2.125 0 0 0 20.125 17V9.875H3.875zM6 4.875A2.125 2.125 0 0 0 3.875 7v1.125h16.25V7A2.125 2.125 0 0 0 18 4.875h-1.125V6a.875.875 0 0 1-1.75 0V4.875h-6.25V6a.875.875 0 1 1-1.75 0V4.875z'
      />
    </g>
    <defs>
      <clipPath id='calendar_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgCalendar as SvgComponent };
