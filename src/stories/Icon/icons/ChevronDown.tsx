import type { SVGProps } from 'react';
const SvgChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      fill='currentColor'
      d='M12.546 16.926a1.65 1.65 0 0 1-1.09 0 1.7 1.7 0 0 1-.6-.39c-.159-.15-.335-.348-.534-.57L4.264 9.177a.65.65 0 0 1 .97-.866l6.058 6.79c.214.239.348.388.456.491a1 1 0 0 0 .137.107.35.35 0 0 0 .237-.003l.023-.014a1 1 0 0 0 .108-.09c.109-.102.242-.252.456-.492l6.058-6.789a.65.65 0 0 1 .97.866l-6.057 6.789c-.199.222-.376.421-.534.57a1.7 1.7 0 0 1-.6.39'
    />
  </svg>
);
export { SvgChevronDown as SvgComponent };
