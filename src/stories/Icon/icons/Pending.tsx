import type { SVGProps } from 'react';
const SvgNamepending = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      stroke='currentColor'
      strokeDasharray='0.5 3.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M12 3.818c6.49 0 9.09 5 9.09 9.09 0 4.092-2.6 6.364-2.6 6.364'
    />
    <path
      fill='currentColor'
      d='M10.56 1.47a.75.75 0 0 1 1.061 0l1.819 1.818.051.057a.75.75 0 0 1-.051 1.004L11.62 6.167a.75.75 0 0 1-1.06-1.06l.481-.483c-4.153.476-7.383 4.005-7.383 8.285A8.344 8.344 0 0 0 12 21.25c2.331 0 4.44-.957 5.955-2.502a.75.75 0 1 1 1.07 1.05A9.81 9.81 0 0 1 12 22.75c-5.432 0-9.84-4.409-9.84-9.84 0-5.143 3.949-9.365 8.978-9.803l-.578-.577a.75.75 0 0 1 0-1.06'
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M12 9.272v4.849l2.727 1.97'
    />
  </svg>
);
export { SvgNamepending as SvgComponent };
