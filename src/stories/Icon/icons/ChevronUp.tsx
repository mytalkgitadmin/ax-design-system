import type { SVGProps } from 'react';
const SvgChevronUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M11.456 7.186a1.65 1.65 0 0 1 1.09 0c.246.086.437.236.6.39.159.15.335.348.534.571l6.058 6.788a.65.65 0 0 1-.971.867l-6.057-6.79c-.214-.239-.348-.389-.457-.492a1 1 0 0 0-.13-.103l-.006-.003a.35.35 0 0 0-.232 0l-.006.003-.022.014a1 1 0 0 0-.108.09c-.11.102-.243.252-.457.492l-6.057 6.789a.65.65 0 0 1-.97-.867l6.057-6.788c.199-.223.375-.421.534-.571.163-.154.354-.304.6-.39'
    />
  </svg>
);
export { SvgChevronUp as SvgComponent };
