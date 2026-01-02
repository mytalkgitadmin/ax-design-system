import type { SVGProps } from 'react';
const SvgLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#link_svg__a)'>
      <path
        fill='currentColor'
        d='M7.888 9.983a4.335 4.335 0 0 1 6.129 0 .876.876 0 0 1-1.239 1.239 2.584 2.584 0 0 0-3.653 0l-3.493 3.493a2.584 2.584 0 0 0 3.653 3.653l1.747-1.747a.876.876 0 0 1 1.238 1.239l-1.747 1.746a4.333 4.333 0 1 1-6.128-6.128zm5.59-5.588a4.333 4.333 0 0 1 6.128 6.128l-3.494 3.494a4.334 4.334 0 0 1-6.129 0 .877.877 0 0 1 1.239-1.239 2.583 2.583 0 0 0 3.653 0l3.493-3.493a2.583 2.583 0 1 0-3.653-3.653l-1.747 1.747a.875.875 0 0 1-1.237-1.238z'
      />
    </g>
    <defs>
      <clipPath id='link_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgLink as SvgComponent };
