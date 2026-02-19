import type { SVGProps } from 'react';
const SvgNamecalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M16 2.25a.75.75 0 0 1 .75.75v1H18l.154.004A3 3 0 0 1 21 7v12l-.004.154a3 3 0 0 1-2.842 2.842L18 22H6a3 3 0 0 1-2.996-2.846L3 19V7a3 3 0 0 1 3-3h1.25V3a.75.75 0 0 1 1.5 0v1h6.5V3a.75.75 0 0 1 .75-.75M4.5 19A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-9h-15zM6 5.5A1.5 1.5 0 0 0 4.5 7v1.5h15V7A1.5 1.5 0 0 0 18 5.5h-1.25V6a.75.75 0 0 1-1.5 0v-.5h-6.5V6a.75.75 0 0 1-1.5 0v-.5z'
    />
  </svg>
);
export { SvgNamecalendar as SvgComponent };
