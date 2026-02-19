import type { SVGProps } from 'react';
const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M17.372 11.01a1.65 1.65 0 0 1 0 1.092 1.7 1.7 0 0 1-.39.6c-.15.158-.348.335-.57.534l-6.789 6.057a.65.65 0 0 1-.866-.97l6.789-6.058c.24-.214.39-.347.492-.456a1 1 0 0 0 .104-.13l.003-.007a.35.35 0 0 0 0-.231l-.003-.006-.014-.023a1 1 0 0 0-.09-.108c-.103-.109-.252-.242-.492-.456L8.757 4.79a.65.65 0 0 1 .866-.97l6.788 6.057c.223.2.422.376.572.534.154.164.303.354.39.6'
    />
  </svg>
);
export { SvgChevronRight as SvgComponent };
