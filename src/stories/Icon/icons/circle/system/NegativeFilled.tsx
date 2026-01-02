import type { SVGProps } from 'react';
const SvgNegativeFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#negative-filled_svg__a)'>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 13.025a.875.875 0 0 0-.875.875v.01a.875.875 0 0 0 1.75 0v-.01a.875.875 0 0 0-.875-.875m0-7.995a.875.875 0 0 0-.875.875V12.5a.875.875 0 0 0 1.75 0V7.905A.875.875 0 0 0 12 7.03'
        clipRule='evenodd'
      />
    </g>
    <defs>
      <clipPath id='negative-filled_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgNegativeFilled as SvgComponent };
