import type { IconProps } from './IconProps';

function Curve({ width = 20, height = 20, stroke = '#000' }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 16.6666C13.3333 16.6666 11.6493 13.2986 10 9.99996C8.35067 6.70129 6.66667 3.33329 2.5 3.33329"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33334 3.33333H10M12.5 3.33333H14.1667M14.1667 3.33333C14.1667 2.41283 14.9128 1.66667 15.8333 1.66667C16.7538 1.66667 17.5 2.41283 17.5 3.33333C17.5 4.25383 16.7538 5 15.8333 5C14.9128 5 14.1667 4.25383 14.1667 3.33333Z"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 16.6667H11.6667M5.83333 16.6667H7.5M5.83333 16.6667C5.83333 15.7462 5.08714 15 4.16667 15C3.24619 15 2.5 15.7462 2.5 16.6667C2.5 17.5872 3.24619 18.3334 4.16667 18.3334C5.08714 18.3334 5.83333 17.5872 5.83333 16.6667Z"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Curve;
