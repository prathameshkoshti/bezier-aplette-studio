import type { IconsProps } from "./types"

function IncDec({ width = 7, height = 11, stroke = "rgb(240, 240, 240)" }: IconsProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.53857 7.23071L3.76934 9.99994L1.00011 7.23071" stroke={stroke} strokeWidth="0.692308" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 3.76929L3.76923 1.00006L6.53846 3.76929" stroke={stroke} strokeWidth="0.692308" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default IncDec