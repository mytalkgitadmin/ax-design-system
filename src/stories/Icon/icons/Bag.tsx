import type { SVGProps } from 'react';
const SvgNamebag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M12 2.35a4.15 4.15 0 0 1 4.147 4h1.99a2.65 2.65 0 0 1 2.644 2.462l.714 10a2.65 2.65 0 0 1-2.643 2.838H5.148a2.65 2.65 0 0 1-2.643-2.838l.714-10A2.65 2.65 0 0 1 5.862 6.35h1.992a4.15 4.15 0 0 1 4.146-4m-6.138 5.3a1.35 1.35 0 0 0-1.346 1.254l-.714 10a1.35 1.35 0 0 0 1.346 1.446h13.704a1.35 1.35 0 0 0 1.346-1.446l-.714-10a1.35 1.35 0 0 0-1.346-1.254H16.15V10a.65.65 0 0 1-1.3 0V7.65h-5.7V10a.65.65 0 0 1-1.3 0V7.65zm6.138-4a2.846 2.846 0 0 0-2.842 2.7h5.684A2.846 2.846 0 0 0 12 3.65'
    />
  </svg>
);
export { SvgNamebag as SvgComponent };
