import type { SVGProps } from 'react';
const SvgKakaoTalk = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 20 20'
    {...props}
  >
    <g clipPath='url(#KakaoTalk_svg__a)'>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M10 .53C4.477.53 0 4.005 0 8.294c0 2.667 1.732 5.018 4.368 6.416l-1.11 4.075c-.097.36.312.646.627.438l4.863-3.227q.615.061 1.252.063c5.523 0 10-3.477 10-7.765S15.523.529 10 .529'
        clipRule='evenodd'
      />
    </g>
    <defs>
      <clipPath id='KakaoTalk_svg__a'>
        <path fill='#fff' d='M0 0h20v20H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgKakaoTalk as SvgComponent };
