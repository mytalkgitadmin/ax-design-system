import type { SVGProps } from 'react';
const SvgNameImage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <rect
      width={18}
      height={18}
      x={3}
      y={3}
      stroke='currentColor'
      strokeWidth={1.5}
      rx={3}
    />
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4M3 18l4.59-2.857c.736-.457 1.798-.405 2.46.121l.306.25c.727.579 1.9.579 2.626 0l3.874-3.08c.726-.579 1.9-.579 2.626 0L21 13.642'
    />
  </svg>
);
export { SvgNameImage as SvgComponent };
