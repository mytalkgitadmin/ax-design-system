import type { SVGProps } from 'react';
const SvgPositiveFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#positive-filled_svg__a)'>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m4.639 6.901a.876.876 0 0 0-1.238-.04L10.666 13.3 8.599 11.36A.876.876 0 0 0 7.4 12.64l2.667 2.5a.876.876 0 0 0 1.198 0l5.333-5a.876.876 0 0 0 .04-1.238'
        clipRule='evenodd'
      />
    </g>
    <defs>
      <clipPath id='positive-filled_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgPositiveFilled as SvgComponent };
