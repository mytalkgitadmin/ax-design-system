import type { SVGProps } from 'react';
const SvgUserFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <g clipPath='url(#user-filled_svg__a)'>
      <path
        fill='currentColor'
        d='M12 13.624c2.309 0 4.462.452 6.071 1.32 1.609.866 2.804 2.234 2.804 4.055v.3c0 .195.001.396-.013.564-.014.18-.05.4-.164.623a1.63 1.63 0 0 1-.71.711c-.224.114-.445.15-.624.164-.169.014-.369.013-.564.013l-13.6.001c-.195 0-.394.001-.563-.013-.18-.014-.4-.05-.624-.164a1.63 1.63 0 0 1-.711-.71 1.6 1.6 0 0 1-.164-.624c-.014-.169-.013-.369-.013-.564v-.301c0-1.82 1.195-3.19 2.803-4.056 1.61-.867 3.763-1.319 6.072-1.319m0-10.999a4.875 4.875 0 1 1 0 9.75 4.875 4.875 0 0 1 0-9.75'
      />
    </g>
    <defs>
      <clipPath id='user-filled_svg__a'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
);
export { SvgUserFilled as SvgComponent };
