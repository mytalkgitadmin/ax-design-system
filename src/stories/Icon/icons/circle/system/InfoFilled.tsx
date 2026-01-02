import type { SVGProps } from 'react';
const SvgInfoFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#info-filled_svg__a)'>
      <path
        fill='currentColor'
        d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 8.44a.875.875 0 0 0-.875.875v4.595a.875.875 0 0 0 1.75 0v-4.595A.875.875 0 0 0 12 10.44m0-3.41a.875.875 0 0 0-.875.875v.01a.875.875 0 0 0 1.75 0v-.01A.875.875 0 0 0 12 7.03'
      />
    </g>
    <defs>
      <clipPath id='info-filled_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgInfoFilled as SvgComponent };
