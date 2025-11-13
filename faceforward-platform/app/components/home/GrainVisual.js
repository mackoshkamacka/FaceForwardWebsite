import "./styling/ContactUsForm.css"; 

export default function GrainVisual() {
    return (
    <svg className="grainOrb" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
            <filter id="grain">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="2"
                    numOctaves="1"
                    seed="2"
                >
                    <animate
                        attributeName="seed"
                        from="2"
                        to="200"
                        dur="8s"
                        repeatCount="indefinite"
                    />
                </feTurbulence>
                <feColorMatrix type="saturate" values="0" />
            </filter>

            <clipPath id="orbClip">
                <circle cx="100" cy="100" r="98" />
            </clipPath>

            <radialGradient id="orbShade" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
        </defs>

        <g clipPath="url(#orbClip)">
            <rect width="200" height="200" filter="url(#grain)" />
            <circle cx="100" cy="100" r="98" fill="url(#orbShade)" />
        </g>
    </svg>
    ); 
}

