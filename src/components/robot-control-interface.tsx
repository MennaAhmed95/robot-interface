import { useState, useEffect } from "react"
import TopHUD from "@/components/hud/top-hud"
import VideoFeed from "@/components/video-feed"
import ControlButtons from "@/components/controls/control-buttons"
import JoystickControls from "@/components/controls/joystick-controls"
import SpeedDisplay from "@/components/displays/speed-display"
import AngleIndicators from "@/components/displays/angle-indicators"
import MapToggle from "@/components/controls/map-toggle"

export default function RobotControlInterface() {
  // State for robot control
  const [driveMode, setDriveMode] = useState<"Auto" | "Semi-Auto" | "Manual">("Manual")
  const [speedMultiplier, setSpeedMultiplier] = useState<"0.5x" | "1x" | "2x">("0.5x")
  const [lightMode, setLightMode] = useState<"Light" | "Spot Light" | "Laser">("Light")
  const [mapMode, setMapMode] = useState<"3D Map" | "Camera" | "2D Map">("Camera")
  const [currentSpeed, setCurrentSpeed] = useState(0.5)
  const [isEmergencyStopped, setIsEmergencyStopped] = useState(false)
  const [showMobileControls, setShowMobileControls] = useState(false)

  // Simulated metrics
  const [metrics, setMetrics] = useState({
    distance: 2456,
    runningTime: { hours: 2, minutes: 34 },
    latitude: "60°16'58\" N",
    status: "OK",
    longitude: "25°01'96\" E",
    elevation: 127,
    temperature: 21,
    battery: 89,
    notifications: 2,
    dateTime: new Date(),
  })

  // Update metrics periodically to simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isEmergencyStopped) {
        setMetrics((prev) => ({
          ...prev,
          distance: prev.distance + Math.random() * 0.5,
          runningTime: {
            hours: prev.runningTime.hours,
            minutes: prev.runningTime.minutes + ((Math.random() > 0.95 ? 1 : 0) % 60),
          },
          battery: Math.max(0, prev.battery - Math.random() * 0.01),
          dateTime: new Date(),
        }))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isEmergencyStopped])

  // Handle emergency stop
  const handleEmergencyStop = () => {
    setIsEmergencyStopped(!isEmergencyStopped)
    if (!isEmergencyStopped) {
      setCurrentSpeed(0)
    } else {
      // Resume previous speed when emergency stop is released
      setCurrentSpeed(speedMultiplier === "0.5x" ? 0.5 : speedMultiplier === "1x" ? 1 : 2)
    }
  }

  // Add zoom state and handlers
  const [zoomLevel, setZoomLevel] = useState(1)

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  // Handle drive mode change
  const handleDriveModeChange = (mode: "Auto" | "Semi-Auto" | "Manual") => {
    setDriveMode(mode)
  }

  // Handle speed multiplier change
  const handleSpeedMultiplierChange = (speed: "0.5x" | "1x" | "2x") => {
    setSpeedMultiplier(speed)
    if (!isEmergencyStopped) {
      setCurrentSpeed(speed === "0.5x" ? 0.5 : speed === "1x" ? 1 : 2)
    }
  }

  // Handle light mode change
  const handleLightModeChange = (mode: "Light" | "Spot Light" | "Laser") => {
    setLightMode(mode)
  }

  // Handle map mode change
  const handleMapModeChange = (mode: "3D Map" | "Camera" | "2D Map") => {
    setMapMode(mode)
  }

  // Toggle mobile controls
  const toggleMobileControls = () => {
    setShowMobileControls(!showMobileControls)
  }

  return (
    <div className="relative h-full w-full bg-black text-white">
      {/* Top HUD */}
      <TopHUD metrics={metrics} onMenuClick={toggleMobileControls} />

      {/* Video Feed */}
      <VideoFeed mapMode={mapMode} zoomLevel={zoomLevel} lightMode={lightMode} />

      {/* Angle Indicators */}
      <AngleIndicators />

      {/* Control Buttons - Only visible on desktop or when mobile controls are shown */}
      <div className={`${showMobileControls ? 'block' : 'hidden md:block'}`}>
        <ControlButtons
          driveMode={driveMode}
          speedMultiplier={speedMultiplier}
          lightMode={lightMode}
          isEmergencyStopped={isEmergencyStopped}
          onDriveModeChange={handleDriveModeChange}
          onSpeedMultiplierChange={handleSpeedMultiplierChange}
          onLightModeChange={handleLightModeChange}
          onEmergencyStop={handleEmergencyStop}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
      </div>

      {/* Joystick Controls - Always visible */}
      <JoystickControls isEmergencyStopped={isEmergencyStopped} />

      {/* Speed Display */}
      <SpeedDisplay speed={currentSpeed} isEmergencyStopped={isEmergencyStopped} />

      {/* Map Toggle - Only visible on desktop or when mobile controls are shown */}
      <div className={`${showMobileControls ? 'block' : 'hidden md:block'}`}>
        <MapToggle mapMode={mapMode} onMapModeChange={handleMapModeChange} />
      </div>
    </div>
  )
}
