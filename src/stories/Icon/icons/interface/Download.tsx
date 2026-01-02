import type { SVGProps } from 'react';
const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#download_svg__a)'>
      <path
        fill='currentColor'
        d='M20 13.125c.483 0 .875.392.875.875v4A2.875 2.875 0 0 1 18 20.875H6A2.875 2.875 0 0 1 3.125 18v-4a.875.875 0 0 1 1.75 0v4c0 .621.504 1.125 1.125 1.125h12c.621 0 1.125-.504 1.125-1.125v-4c0-.483.392-.875.875-.875m-8-10c.483 0 .875.392.875.875v8.887l2.506-2.506a.876.876 0 0 1 1.238 1.238l-4 4a.876.876 0 0 1-1.174.058l-.064-.058-4-4a.876.876 0 0 1 1.238-1.238l2.506 2.506V4c0-.483.392-.875.875-.875'
      />
    </g>
    <defs>
      <clipPath id='download_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgDownload as SvgComponent };
