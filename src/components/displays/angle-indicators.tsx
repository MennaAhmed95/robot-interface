export default function AngleIndicators() {
  return (
    <div className="absolute top-[30%] sm:top-[20%] left-0 right-0 flex justify-center space-x-12 sm:space-x-24 z-10">
      {/* Left Angle Indicator */}
      <div className="relative w-12 h-12 sm:w-16 sm:h-16">
        <div className="absolute inset-0 rounded-full border border-gray-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-bold">5°</div>
            <div className="flex justify-center">
              <svg width="16" height="8" className="sm:w-[20px] sm:h-[10px]" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L40 20H0L20 0Z" fill="#FFD700" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-1 sm:h-1.5 bg-gray-400"
              style={{
                transformOrigin: "center 24px",
                transform: `rotate(${i * 30}deg) translateY(-23px)`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Center Angle Indicator */}
      <div className="relative w-12 h-12 sm:w-16 sm:h-16">
        <div className="absolute inset-0 rounded-full border border-gray-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-bold">35°</div>
            <div className="text-[10px] sm:text-xs">NE</div>
          </div>
        </div>
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-1 sm:h-1.5 bg-gray-400"
              style={{
                transformOrigin: "center 24px",
                transform: `rotate(${i * 30}deg) translateY(-23px)`,
              }}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0">
          <div
            className="absolute w-0.5 h-4 sm:h-5 bg-yellow-400"
            style={{
              transformOrigin: "center 24px",
              transform: `rotate(45deg) translateY(-21px)`,
            }}
          ></div>
        </div>
      </div>

      {/* Right Angle Indicator */}
      <div className="relative w-12 h-12 sm:w-16 sm:h-16">
        <div className="absolute inset-0 rounded-full border border-gray-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs sm:text-sm font-bold">10°</div>
            <div className="flex justify-center">
              <svg width="16" height="8" className="sm:w-[20px] sm:h-[10px]" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H40L20 20L0 0Z" fill="#FFD700" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-1 sm:h-1.5 bg-gray-400"
              style={{
                transformOrigin: "center 24px",
                transform: `rotate(${i * 30}deg) translateY(-23px)`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
