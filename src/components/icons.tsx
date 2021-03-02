import { Avatar, color, gradient, GradientName, typeScale } from '@travelperksl/design-system'
import { getInitials, getRandomGradientName, getFontSize, getPixelSize } from '@travelperksl/design-system/components/Avatar'
import React, { ComponentProps } from 'react'
import Styled from 'styled-components/macro'

const HoverableG = Styled.g<{ hoverColor: string, color: string }>`
  fill: ${(p) => p.color};
  &:hover {
    fill: ${(p) => p.hoverColor};
    cursor: pointer;
  }
`

function Icon(
  { size = "medium",
    ...props
  }: {
    size?: ComponentProps<typeof Avatar>['size'],
    onClick?: () => void,
    text?: string,
    tooltip: string,
    imgURL?: string,
    gradient?: GradientName,
    showTriangle: boolean
  }) {

  const fontSettings = typeScale[getFontSize(size)]
  const fontSize = fontSettings.fontSize
  const fontWeight = fontSettings.fontWeight
  const pixelSize = `calc(${getPixelSize(size)} + 20px)`

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50"
      height={pixelSize} width={pixelSize}
      onClick={() => props.onClick && props.onClick()}
    >
      <title>{props.tooltip}</title>
      <HoverableG filter="url(#filter0_ddd)" color={color.madrugada} hoverColor={color.steel}>
        <g clipPath="url(#clip0)">
          <circle cx="25" cy="20" r="16" />
          {props.imgURL
            ? <circle cx="25" cy="20" r="13" fill="url(#avatarImage)" pointerEvents="none" />
            : (
              <>
                <circle cx="25" cy="20" r="13" fill={props.gradient ? "url(#gradient)" : "inherit"} pointerEvents="none" />
                <text width="100%" height="100%" x="25" y="25"
                  fontWeight={fontWeight} fontSize={fontSize}
                  fill="white" textAnchor="middle"
                  pointerEvents="none"
                >
                  {props.text}
                </text>
              </>
            )
          }
        </g>
        {props.showTriangle && <path d="M20,35 30,35 25,40z" />}
      </HoverableG>
      <defs>
        {props.gradient && (
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform={`rotate(${gradient[props.gradient].angle})`}>
            <stop offset="0%" style={{ stopColor: gradient[props.gradient].from }} />
            <stop offset="100%" style={{ stopColor: gradient[props.gradient].to }} />
          </linearGradient>
        )}
        <clipPath id="clip0">
          <circle cx="25" cy="20" r="16" />
        </clipPath>
        {props.imgURL && (
          <pattern id="avatarImage" width="100%" height="100%" patternContentUnits="objectBoundingBox">
            <image width="1" height="1" href={props.imgURL} />
          </pattern>
        )}
        <filter id="filter0_ddd" width="48" height="63.3" x=".9" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix values="0 0 0 0 0.196078 0 0 0 0 0.196078 0 0 0 0 0.364706 0 0 0 0.06 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix values="0 0 0 0 0.47451 0 0 0 0 0.529412 0 0 0 0 0.615686 0 0 0 0.1 0" />
          <feBlend in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix values="0 0 0 0 0.196078 0 0 0 0 0.196078 0 0 0 0 0.364706 0 0 0 0.06 0" />
          <feBlend in2="effect2_dropShadow" result="effect3_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect3_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

type Props = {
  size?: ComponentProps<typeof Avatar>['size'],
  onClick?: () => void,
}

type AvatarProps = {
  user: {
    firstName: string,
    lastName: string
  },
  avatarURL?: string,
} & Props

type NumberProps = {
  users: {
    firstName: string,
    lastName: string
  }[]
} & Props

const AvatarIcon = (props: AvatarProps & { showTriangle: boolean }) => {
  const gradient = getRandomGradientName(props.user.firstName, props.user.lastName)
  return (
    <Icon
      tooltip={`${props.user.firstName} ${props.user.lastName}`}
      gradient={gradient}
      imgURL={props.avatarURL}
      text={getInitials(props.user.firstName, props.user.lastName)}
      {...props}
    />
  )
}

const ItineraryIcon = (props: NumberProps & { showTriangle: boolean }) => {
  return (
    <Icon
      tooltip={props.users.map(u => `${u.firstName} ${u.lastName}`).join("\n")}
      text={`${props.users.length}`}
      {...props}
    />
  )
}

export const AvatarMarkerIcon = (props: AvatarProps) => <AvatarIcon {...props} showTriangle={true} />
export const AvatarItineraryIcon = (props: AvatarProps) => <AvatarIcon {...props} showTriangle={false} />

export const NumberMarkerIcon = (props: NumberProps) => <ItineraryIcon {...props} showTriangle={true} />
export const NumberItineraryIcon = (props: NumberProps) => <ItineraryIcon {...props} showTriangle={false} />
