interface MapToggleProps {
  mapMode: "3D Map" | "Camera" | "2D Map"
  onMapModeChange: (mode: "3D Map" | "Camera" | "2D Map") => void
}

export default function MapToggle({ mapMode, onMapModeChange }: MapToggleProps) {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex bg-gray-800/70 rounded-md border border-gray-600 overflow-hidden z-10 text-xs sm:text-base">
      <button
        className={`px-3 py-1 sm:px-6 sm:py-2 ${mapMode === "3D Map" ? "bg-gray-700" : ""}`}
        onClick={() => onMapModeChange("3D Map")}
      >
        <span className="mr-1 sm:mr-2">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="inline-block w-0.5 sm:w-1 h-3 sm:h-4 mx-0.5 bg-gray-500"></span>
          ))}
        </span>
        3D Map
      </button>
      <button
        className={`px-3 py-1 sm:px-6 sm:py-2 ${mapMode === "Camera" ? "bg-gray-700" : ""}`}
        onClick={() => onMapModeChange("Camera")}
      >
        <span className="mr-1 sm:mr-2">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className={`inline-block w-0.5 sm:w-1 h-3 sm:h-4 mx-0.5 ${mapMode === "Camera" ? "bg-yellow-400" : "bg-gray-500"}`}
            ></span>
          ))}
        </span>
        Camera
      </button>
      <button
        className={`px-3 py-1 sm:px-6 sm:py-2 ${mapMode === "2D Map" ? "bg-gray-700" : ""}`}
        onClick={() => onMapModeChange("2D Map")}
      >
        <span className="mr-1 sm:mr-2">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="inline-block w-0.5 sm:w-1 h-3 sm:h-4 mx-0.5 bg-gray-500"></span>
          ))}
        </span>
        2D Map
      </button>
    </div>
  )
}
