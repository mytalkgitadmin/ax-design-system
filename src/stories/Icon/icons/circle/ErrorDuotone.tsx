import type { SVGProps } from 'react';
const SvgErrorDuotone = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#error-duotone_svg__a)'>
      <path
        fill='#FFEEF1'
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10'
      />
      <path
        fill='#E6374F'
        d='M12 15.025c.483 0 .875.392.875.875v.01a.875.875 0 0 1-1.75 0v-.01c0-.483.392-.875.875-.875M12 7.03c.483 0 .875.392.875.875V12.5a.875.875 0 0 1-1.75 0V7.905c0-.483.392-.875.875-.875'
      />
    </g>
    <defs>
      <clipPath id='error-duotone_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgErrorDuotone as SvgComponent };
