import type { SVGProps } from 'react';
const SvgBag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#bag_svg__a)'>
      <path
        fill='currentColor'
        d='M12 2.125c2.29 0 4.168 1.76 4.358 4h1.78a2.876 2.876 0 0 1 2.868 2.67l.714 10a2.876 2.876 0 0 1-2.868 3.08H5.149a2.876 2.876 0 0 1-2.869-3.08l.714-10a2.875 2.875 0 0 1 2.868-2.67h1.78c.19-2.24 2.068-4 4.358-4m-6.138 5.75c-.59 0-1.08.456-1.122 1.045l-.714 10a1.126 1.126 0 0 0 1.123 1.205h13.703c.652 0 1.17-.554 1.123-1.205l-.715-10a1.125 1.125 0 0 0-1.122-1.045h-1.763V10a.875.875 0 0 1-1.75 0V7.875h-5.25V10a.875.875 0 0 1-1.75 0V7.875zm6.138-4a2.62 2.62 0 0 0-2.595 2.25h5.19A2.62 2.62 0 0 0 12 3.875'
      />
    </g>
    <defs>
      <clipPath id='bag_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgBag as SvgComponent };
