import type { SVGProps } from 'react';
const SvgInfoDuo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#info-duo_svg__a)'>
      <path
        fill='#E3E6EE'
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10'
      />
      <path
        fill='#888E9C'
        d='M12 8.79a.875.875 0 0 0 .875-.875v-.01a.875.875 0 0 0-1.75 0v.01c0 .483.392.875.875.875M12 16.785a.875.875 0 0 0 .875-.875v-4.595a.875.875 0 0 0-1.75 0v4.595c0 .483.392.875.875.875'
      />
    </g>
    <defs>
      <clipPath id='info-duo_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgInfoDuo as SvgComponent };
