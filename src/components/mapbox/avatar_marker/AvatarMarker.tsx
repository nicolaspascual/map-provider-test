import React, { ComponentProps, useState } from 'react'
import { Marker, Popup } from 'react-map-gl'


export default function AvatarMarker({ img, size = 100, ...markerProps }: { img: string, size?: number } & ComponentProps<typeof Marker>) {

  const [isPopUpOpen, setPopUpOpen] = useState(false)

  return (
    <>
      <Marker offsetTop={-(size / 4) * 3} offsetLeft={-size / 2} {...markerProps}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50"
          height={`${size}px`} width={`${size}px`} onClick={() => setPopUpOpen(true)}>
          <title>Random tooltip</title>
          <g filter="url(#filter0_ddd)">
            <g clipPath="url(#clip0)">
              <rect width="32" height="32" x="8.9" y="4" fill="#1D2C3C" rx="16" />
              <circle cx="24.9" cy="20" r="12" fill="#1D2C3C" />
              <circle cx="24.9" cy="20" r="12" fill="url(#avatarImage)" />
            </g>
            <path fill="#1D2C3C" d="M24 39l-4-4h7l-3 4z" />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="32" height="32" x="8.9" y="4" fill="#fff" rx="16" />
            </clipPath>
            <pattern id="avatarImage" width="100%" height="100%" patternContentUnits="objectBoundingBox">
              <image width="1" height="1" href={img} />
            </pattern>
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
      </Marker>
      {isPopUpOpen && (
        <Popup
          latitude={markerProps.latitude}
          longitude={markerProps.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setPopUpOpen(false)}
        >
          <div>
            <h1>RANDOM HTML BEING DISPLAYED</h1>
          </div>
        </Popup>
      )}
    </>
  )

}