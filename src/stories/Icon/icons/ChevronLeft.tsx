import type { SVGProps } from 'react';
const SvgChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M6.632 12.544a1.65 1.65 0 0 1 0-1.09c.086-.246.235-.437.39-.6.15-.159.348-.335.57-.534l6.789-6.058a.65.65 0 0 1 .866.97l-6.79 6.059c-.239.213-.388.347-.491.455a1 1 0 0 0-.104.13l-.003.007a.35.35 0 0 0 0 .232l.003.005.014.023a1 1 0 0 0 .09.108c.103.11.252.243.492.457l6.789 6.057a.65.65 0 0 1-.866.97l-6.788-6.057c-.223-.199-.422-.376-.572-.534a1.7 1.7 0 0 1-.39-.6'
    />
  </svg>
);
export { SvgChevronLeft as SvgComponent };
