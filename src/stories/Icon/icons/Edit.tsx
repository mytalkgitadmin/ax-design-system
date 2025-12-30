import type { SVGProps } from 'react';
const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#edit_svg__a)'>
      <path
        fill='currentColor'
        d='M18.001 17.711a.876.876 0 0 1 0 1.75h-6a.875.875 0 0 1 0-1.75zM15.402 4.674a1.876 1.876 0 0 1 2.653 0l1.068 1.068c.732.732.732 1.92 0 2.652L9.607 17.91c-.361.361-.812.62-1.305.748l-2.012.527a1.375 1.375 0 0 1-1.678-1.678l.526-2.012c.13-.493.388-.944.749-1.304zm1.415 1.237a.126.126 0 0 0-.176 0l-9.517 9.517a1.1 1.1 0 0 0-.293.51l-.364 1.391 1.392-.363c.193-.05.37-.152.51-.293l9.516-9.517a.125.125 0 0 0 0-.176z'
      />
    </g>
    <defs>
      <clipPath id='edit_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgEdit as SvgComponent };
