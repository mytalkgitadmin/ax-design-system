import type { SVGProps } from 'react';
const SvgNamelist = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M21 11a.75.75 0 0 1 0 1.5H7A.75.75 0 0 1 7 11zM21 16a.75.75 0 0 1 0 1.5H7A.75.75 0 0 1 7 16zM21 6a.75.75 0 0 1 0 1.5H7A.75.75 0 0 1 7 6z'
    />
    <circle cx={3.75} cy={6.75} r={0.75} fill='currentColor' />
    <circle cx={3.75} cy={16.75} r={0.75} fill='currentColor' />
    <circle cx={3.75} cy={11.75} r={0.75} fill='currentColor' />
  </svg>
);
export { SvgNamelist as SvgComponent };
