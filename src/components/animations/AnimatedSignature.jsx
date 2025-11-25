const AnimatedSignature = ({ width = "150px", height = "auto", ...props }) => {
  return (
    <div
      style={{
        width,
        height,
        display: "inline-block",
      }}
      {...props}
    >
      <svg
        id="efXUan92bq31"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 450 250"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient
            id="efXUan92bq32-stroke"
            x1="0"
            y1="0.5"
            x2="1"
            y2="0.5"
            spreadMethod="pad"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="11%" stopColor="#999999ff " />
            <stop offset="93%" stopColor="#999999ff " />
          </linearGradient>
          <linearGradient
            id="efXUan92bq33-stroke"
            x1="0"
            y1="0.5"
            x2="1"
            y2="0.5"
            spreadMethod="pad"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="15%" stopColor="#999999ff " />
            <stop offset="90%" stopColor="#999999ff " />
          </linearGradient>
          <linearGradient
            id="efXUan92bq34-stroke"
            x1="1"
            y1="0"
            x2="0"
            y2="0.944969"
            spreadMethod="pad"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#999999ff " />
            <stop offset="56%" stopColor="#999999ff " />
          </linearGradient>
        </defs>

        {/* Animated paths with CSS animations */}
        <path
          id="efXUan92bq32"
          d="M302.404296,495.523376c-2.403052-1.750093-3.194671-7.345106,1.525801-11.290923c28.693217-20.760529,89.998113-39.090413,117.86358-36.008885c29.223569,0,50.316239,28.7063,29.223569,62.493981-15.845142,33.290043-73.495215,71.927855-100.092501,83.677685-31.65106,10.178918-46.994648-7.702476-12.511562-23.802485c25.923524-11.51048,70.801483-29.758481,90.632539-35.093407c17.182692-4.069006,44.902835-24.382438,55.844291-39.975966c10.39009-12.704144,25.531846-36.214321,27.109985-47.299811c4.666282-20.838115-2.26602-26.362547-15.819063-5.798042-23.807227,37.966762-33.682389,103.744724-30.210847,116.876303.26986,19.19766,16.143801,24.498331,31.431487,11.290921l26.243765-30.516006"
          transform="translate(-264.520718,-422.182073)"
          fill="none"
          stroke="url(#efXUan92bq32-stroke)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          style={{
            strokeDasharray: "890.54",
            strokeDashoffset: "890.54",
            animation: "draw1 2s ease-in-out 0.2s forwards",
          }}
        />

        <path
          id="efXUan92bq33"
          d="M573.102141,477.95477c38.922512-36.062537,33.757783-49.756955-19.901093-20.730306-41.201052,20.730306-69.326914,55.785923-9.535942,69.653827c37.291063,9.638015,46.32741,37.742563,19.901092,55.971823-39.92086,22.287958-78.676187,0-17.828063-30.266246c26.163013-11.720704,60.568733-29.611372,156.306502-23.217942"
          transform="translate(-264.520716,-422.182076)"
          fill="none"
          stroke="url(#efXUan92bq33-stroke)"
          strokeWidth="6"
          strokeLinecap="round"
          style={{
            strokeDasharray: "544.42",
            strokeDashoffset: "544.42",
            animation: "draw2 2s ease-in-out 0.4s forwards",
          }}
        />

        <path
          id="efXUan92bq34"
          d="M382.218273,467.985874c-15.76364,29.80424-37.399993,94.871833-29.012738,105.053658"
          transform="translate(-264.52072,-422.182077)"
          fill="none"
          stroke="url(#efXUan92bq34-stroke)"
          strokeWidth="6"
          strokeLinecap="round"
          style={{
            strokeDasharray: "110.8",
            strokeDashoffset: "110.8",
            animation: "draw3 1s ease-in-out 0s forwards",
          }}
        />

        {/* Logo text and other elements */}

        {/* CSS Animations */}
        <style>
          {`
            @keyframes draw1 {
              to { stroke-dashoffset: 0; }
            }
            @keyframes draw2 {
              to { stroke-dashoffset: 0; }
            }
            @keyframes draw3 {
              to { stroke-dashoffset: 0; }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </svg>
    </div>
  );
};

export default AnimatedSignature;