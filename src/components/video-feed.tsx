import { useState, useEffect } from "react"

interface VideoFeedProps {
  mapMode: "3D Map" | "Camera" | "2D Map"
  zoomLevel: number
  lightMode: "Light" | "Spot Light" | "Laser"
}

export default function VideoFeed({ mapMode, zoomLevel, lightMode }: VideoFeedProps) {
  // State for video noise effect
  const [noiseElements, setNoiseElements] = useState<React.ReactNode[]>([])

  // Generate noise elements for camera view
  useEffect(() => {
    if (mapMode === "Camera") {
      const newNoiseElements = []
      const noiseCount = window.innerWidth < 768 ? 50 : 100; // Fewer noise elements on mobile

      for (let i = 0; i < noiseCount; i++) {
        newNoiseElements.push(
          <div
            key={i}
            className="absolute bg-white/10"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.2,
            }}
          />,
        )
      }
      setNoiseElements(newNoiseElements)
    }
  }, [mapMode])

  // Get light effect based on current light mode
  const getLightEffect = () => {
    if (mapMode !== "Camera") return null

    switch (lightMode) {
      case "Light":
        return <div className="absolute inset-0 bg-white/10 pointer-events-none transition-opacity duration-300" />
      case "Spot Light":
        return (
          <div className="absolute inset-0 pointer-events-none transition-all duration-300">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full bg-gradient-radial from-white/30 to-transparent" />
          </div>
        )
      case "Laser":
        return (
          <div className="absolute inset-0 pointer-events-none transition-all duration-300">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-screen bg-red-500/70 animate-pulse" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="w-full h-full transition-transform duration-300" style={{ transform: `scale(${zoomLevel})` }}>
        {/* Camera View */}
        {mapMode === "Camera" && (
          <div className="relative w-full h-full">
            {/* Tunnel background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>

            {/* Tunnel walls */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-black/50 to-transparent"></div>
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/50 to-transparent"></div>
            </div>

            {/* Tunnel floor with grid */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 perspective-[1000px]">
              <div className="absolute inset-0 transform-gpu rotate-x-60 origin-top bg-gradient-to-b from-gray-800 to-gray-900">
                {/* Grid lines - fewer on mobile */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 sm:grid-cols-12 sm:grid-rows-12">
                  {Array.from({ length: window.innerWidth < 768 ? 6 : 12 }).map((_, i) => (
                    <div key={`h-${i}`} className="w-full h-px bg-white/10"></div>
                  ))}
                  {Array.from({ length: window.innerWidth < 768 ? 6 : 12 }).map((_, i) => (
                    <div key={`v-${i}`} className="h-full w-px bg-white/10"></div>
                  ))}
                </div>

                {/* Center line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 transform -translate-x-1/2"></div>
              </div>
            </div>

            {/* Video noise effect */}
            <div className="absolute inset-0 pointer-events-none">{noiseElements}</div>

            {/* Light effect overlay */}
            {getLightEffect()}
          </div>
        )}

        {/* 3D Map View */}
        {mapMode === "3D Map" && (
          <div className="relative w-full h-full bg-cyan-950">
            {/* Grid lines - fewer on mobile */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 sm:grid-cols-12 sm:grid-rows-12">
              {Array.from({ length: window.innerWidth < 768 ? 6 : 12 }).map((_, i) => (
                <div key={`h-${i}`} className="w-full h-px bg-cyan-700/30"></div>
              ))}
              {Array.from({ length: window.innerWidth < 768 ? 6 : 12 }).map((_, i) => (
                <div key={`v-${i}`} className="h-full w-px bg-cyan-700/30"></div>
              ))}
            </div>

            {/* Robot position */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-400"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 sm:-translate-y-10 w-1 h-8 sm:h-10 bg-yellow-400"></div>
            </div>
          </div>
        )}

        {/* 2D Map View */}
        {mapMode === "2D Map" && (
          <div className="relative w-full h-full bg-gray-900">
            {/* Grid lines - fewer on mobile */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 sm:grid-cols-16 sm:grid-rows-16">
              {Array.from({ length: window.innerWidth < 768 ? 8 : 16 }).map((_, i) => (
                <div key={`h-${i}`} className="w-full h-px bg-gray-700/30"></div>
              ))}
              {Array.from({ length: window.innerWidth < 768 ? 8 : 16 }).map((_, i) => (
                <div key={`v-${i}`} className="h-full w-px bg-gray-700/30"></div>
              ))}
            </div>

            {/* Path */}
            <svg className="absolute inset-0 w-full h-full">
              <path d="M 10% 90% L 30% 70% L 50% 50% L 70% 30%" stroke="#00ff00" strokeWidth="2" className="sm:stroke-[3]" fill="none" />
            </svg>

            {/* Robot position */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
