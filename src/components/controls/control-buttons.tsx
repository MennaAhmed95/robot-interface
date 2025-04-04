import { Menu, ZoomIn, ZoomOut } from "lucide-react"

interface ControlButtonsProps {
  driveMode: "Auto" | "Semi-Auto" | "Manual"
  speedMultiplier: "0.5x" | "1x" | "2x"
  lightMode: "Light" | "Spot Light" | "Laser"
  isEmergencyStopped: boolean
  onDriveModeChange: (mode: "Auto" | "Semi-Auto" | "Manual") => void
  onSpeedMultiplierChange: (speed: "0.5x" | "1x" | "2x") => void
  onLightModeChange: (mode: "Light" | "Spot Light" | "Laser") => void
  onEmergencyStop: () => void
  onZoomIn: () => void
  onZoomOut: () => void
}

export default function ControlButtons({
  driveMode,
  speedMultiplier,
  lightMode,
  isEmergencyStopped,
  onDriveModeChange,
  onSpeedMultiplierChange,
  onLightModeChange,
  onEmergencyStop,
  onZoomIn,
  onZoomOut,
}: ControlButtonsProps) {
  return (
    <>
      {/* Menu Button - Hidden on mobile as it's in the top HUD */}
      <button
        className="absolute top-24 left-6 bg-gray-800/70 hover:bg-gray-700/70 text-white px-4 py-2 sm:px-6 rounded-md border border-gray-600 z-10 hidden md:flex items-center"
        onClick={() => { }}
      >
        <Menu className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 inline-block" />
        <span className="text-sm sm:text-base">MENU</span>
      </button>

      {/* Emergency Stop Button */}
      <button
        className={`absolute top-24 right-6 ${isEmergencyStopped ? "bg-red-700" : "bg-red-600"
          } hover:bg-red-700 text-white px-4 py-2 sm:px-6 rounded-md border border-red-800 z-10 font-bold text-sm sm:text-base`}
        onClick={onEmergencyStop}
      >
        {isEmergencyStopped ? "CONTINUE" : "STOP"}
      </button>

      {/* Drive Mode Controls */}
      <div className="absolute top-1/3 left-2 sm:left-6 bg-gray-800/70 rounded-md border border-gray-600 overflow-hidden z-10 text-sm sm:text-base w-28 sm:w-auto">
        <button
          className={`block w-full px-3 py-1 sm:px-6 sm:py-2 text-left ${driveMode === "Auto" ? "bg-gray-700 border-l-4 border-yellow-400" : ""
            }`}
          onClick={() => onDriveModeChange("Auto")}
        >
          Auto
          <span className="float-right">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-block w-1 h-3 sm:h-4 mx-0.5 bg-gray-500"></span>
            ))}
          </span>
        </button>
        <button
          className={`block w-full px-3 py-1 sm:px-6 sm:py-2 text-left ${driveMode === "Semi-Auto" ? "bg-gray-700 border-l-4 border-yellow-400" : ""
            }`}
          onClick={() => onDriveModeChange("Semi-Auto")}
        >
          Semi-Auto
          <span className="float-right">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-block w-1 h-3 sm:h-4 mx-0.5 bg-gray-500"></span>
            ))}
          </span>
        </button>
        <button
          className={`block w-full px-3 py-1 sm:px-6 sm:py-2 text-left ${driveMode === "Manual" ? "bg-gray-700 border-l-4 border-yellow-400" : ""
            }`}
          onClick={() => onDriveModeChange("Manual")}
        >
          Manual
          <span className="float-right">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className={`inline-block w-1 h-3 sm:h-4 mx-0.5 ${driveMode === "Manual" ? "bg-yellow-400" : "bg-gray-500"}`}
              ></span>
            ))}
          </span>
        </button>
      </div>

      {/* Speed Controls */}
      <div className="absolute top-1/2 left-2 sm:left-6 bg-gray-800/70 rounded-md border border-gray-600 overflow-hidden z-10 text-sm sm:text-base w-28 sm:w-auto">
        <button
          className={`block w-full px-3 py-1 sm:px-6 sm:py-2 text-left ${speedMultiplier === "2x" ? "bg-gray-700 border-l-4 border-yellow-400" : ""
            }`}
          onClick={() => onSpeedMultiplierChange("2x")}
        >
          2x
          <span className="float-right">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-block w-1 h-3 sm:h-4 mx-0.5 bg-gray-500"></span>
            ))}
          </span>
        </button>
        <button
          className={`block w-full px-3 py-1 sm:px-6 sm:py-2 text-left ${speedMultiplier === "1x" ? "bg-gray-700 border-l-4 border-yellow-400" : ""
            }`}
          onClick={() => onSpeedMultiplierChange("1x")}
        >
          1x
          <span className="float-right">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className={`inline-block w-1 h-3 sm:h-4 mx-0.5 ${speedMultiplier === "1x" ? "bg-yellow-400" : "bg-gray-500"}`}
              ></span>
            ))}
          </span>
        </button>
        <button
          className={`block w-full px-3 py-1 sm:px-6 sm:py-2 text-left ${speedMultiplier === "0.5x" ? "bg-gray-700 border-l-4 border-yellow-400" : ""
            }`}
          onClick={() => onSpeedMultiplierChange("0.5x")}
        >
          0.5x
          <span className="float-right">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-block w-1 h-3 sm:h-4 mx-0.5 bg-gray-500"></span>
            ))}
          </span>
        </button>
      </div>

      {/* Light Controls */}
      <div className="absolute top-1/3 right-2 sm:right-6 bg-gray-800/70 rounded-md border border-gray-600 overflow-hidden z-10 text-sm sm:text-base w-28 sm:w-auto">
        <button
          className={`block w-full px-3 py-1 sm:px-6 sm:py-2 text-left ${lightMode === "Light" ? "bg-gray-700 border-r-4 border-yellow-400" : ""
            }`}
          onClick={() => onLightModeChange("Light")}
        >
          <span className="float-right">Light</span>
          <span className="float-left">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-block w-1 h-3 sm:h-4 mx-0.5 bg-gray-500"></span>
            ))}
          </span>
        </button>
        <button
          className={`block w-full px-3 py-1 sm:px-6 sm:py-2 text-left ${lightMode === "Spot Light" ? "bg-gray-700 border-r-4 border-yellow-400" : ""
            }`}
          onClick={() => onLightModeChange("Spot Light")}
        >
          <span className="float-right">Spot Light</span>
          <span className="float-left">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-block w-1 h-3 sm:h-4 mx-0.5 bg-gray-500"></span>
            ))}
          </span>
        </button>
        <button
          className={`block w-full px-3 py-1 sm:px-6 sm:py-2 text-left ${lightMode === "Laser" ? "bg-gray-700 border-r-4 border-yellow-400" : ""
            }`}
          onClick={() => onLightModeChange("Laser")}
        >
          <span className="float-right">Laser</span>
          <span className="float-left">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className={`inline-block w-1 h-3 sm:h-4 mx-0.5 ${lightMode === "Laser" ? "bg-yellow-400" : "bg-gray-500"}`}
              ></span>
            ))}
          </span>
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-1/2 right-2 sm:right-6 flex flex-col gap-2 z-10">
        <button
          className="bg-gray-800/70 hover:bg-gray-700/70 p-2 sm:p-3 rounded-md border border-gray-600"
          onClick={onZoomIn}
        >
          <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          className="bg-gray-800/70 hover:bg-gray-700/70 p-2 sm:p-3 rounded-md border border-gray-600"
          onClick={onZoomOut}
        >
          <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </>
  )
}
