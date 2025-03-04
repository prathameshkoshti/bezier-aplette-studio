import type { IconProps } from './IconProps';

function CopyIcon({ width = 24, height = 24, stroke = '#000' }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
    >
      <path
        d="M11 22C9.89543 22 9 21.1046 9 20L9 11.0014C9 9.89629 9.89629 9.00063 11.0014 9.00141L20.0014 9.00776C21.1054 9.00854 22 9.90374 22 11.0078L22 20C22 21.1046 21.1046 22 20 22H11Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8.42857V4.00907C17 2.90504 16.1054 2.00984 15.0014 2.00907L4.0014 2.0014C2.89628 2.00063 2 2.89628 2 4.0014L2 15C2 16.1046 2.89543 17 4 17H8.42857"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CopyIcon;
