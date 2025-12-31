import type { SVGProps } from 'react';
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#plus_svg__a)'>
      <path
        fill='currentColor'
        d='M12 4.125c.483 0 .875.392.875.875v6.125H19a.875.875 0 0 1 .09 1.745l-.09.005h-6.125V19a.875.875 0 0 1-1.75 0v-6.125H5a.875.875 0 0 1 0-1.75h6.125V5c0-.483.392-.875.875-.875'
      />
    </g>
    <defs>
      <clipPath id='plus_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgPlus as SvgComponent };
