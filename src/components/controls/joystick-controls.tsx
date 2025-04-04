import { useState, useRef } from "react"

interface JoystickControlsProps {
  isEmergencyStopped: boolean
}

export default function JoystickControls({ isEmergencyStopped }: JoystickControlsProps) {
  const [leftPosition, setLeftPosition] = useState({ x: 0, y: 0 })
  const [rightPosition, setRightPosition] = useState({ x: 0, y: 0 })
  const [leftActive, setLeftActive] = useState(false)
  const [rightActive, setRightActive] = useState(false)

  const leftJoystickRef = useRef<HTMLDivElement>(null)
  const rightJoystickRef = useRef<HTMLDivElement>(null)

  const handleJoystickStart = (_e: React.MouseEvent | React.TouchEvent, side: "left" | "right") => {
    if (isEmergencyStopped) return

    const setActive = side === "left" ? setLeftActive : setRightActive
    setActive(true)

    const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
      const joystickRef = side === "left" ? leftJoystickRef : rightJoystickRef
      if (!joystickRef.current) return

      const rect = joystickRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      let clientX, clientY
      if (moveEvent instanceof MouseEvent) {
        clientX = moveEvent.clientX
        clientY = moveEvent.clientY
      } else {
        clientX = moveEvent.touches[0].clientX
        clientY = moveEvent.touches[0].clientY
      }

      // Calculate distance from center
      let deltaX = clientX - centerX
      let deltaY = clientY - centerY

      // Limit movement to joystick radius
      const radius = rect.width / 2 - 20 // Subtract thumb size
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance > radius) {
        const angle = Math.atan2(deltaY, deltaX)
        deltaX = Math.cos(angle) * radius
        deltaY = Math.sin(angle) * radius
      }

      // Update position
      const setPosition = side === "left" ? setLeftPosition : setRightPosition
      setPosition({ x: deltaX, y: deltaY })
    }

    const endHandler = () => {
      const setPosition = side === "left" ? setLeftPosition : setRightPosition
      const setActive = side === "left" ? setLeftActive : setRightActive

      // Reset position with animation
      setPosition({ x: 0, y: 0 })
      setActive(false)

      document.removeEventListener("mousemove", moveHandler)
      document.removeEventListener("touchmove", moveHandler)
      document.removeEventListener("mouseup", endHandler)
      document.removeEventListener("touchend", endHandler)
    }

    document.addEventListener("mousemove", moveHandler)
    document.addEventListener("touchmove", moveHandler)
    document.addEventListener("mouseup", endHandler)
    document.addEventListener("touchend", endHandler)
  }

  return (
    <div className="absolute bottom-16 left-0 right-0 flex justify-between px-4 sm:px-16 z-10">
      {/* Left Joystick */}
      <div
        ref={leftJoystickRef}
        className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-800/70 rounded-full border-2 border-gray-600"
        onMouseDown={(e) => handleJoystickStart(e, "left")}
        onTouchStart={(e) => handleJoystickStart(e, "left")}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-700/70 border border-gray-500"></div>
        </div>
        <div
          className={`absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black border-2 ${isEmergencyStopped ? "border-red-500" : leftActive ? "border-yellow-400" : "border-gray-400"
            } flex items-center justify-center transition-all duration-100`}
          style={{
            transform: `translate(${leftPosition.x}px, ${leftPosition.y}px)`,
            left: "calc(50% - 10px)",
            top: "calc(50% - 10px)",
            boxShadow: leftActive ? "0 0 10px rgba(255, 215, 0, 0.5)" : "none",
          }}
        >
          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${leftActive ? "bg-yellow-400" : "bg-gray-400"}`}></div>
        </div>
        {/* Directional indicators */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 sm:border-l-8 sm:border-r-8 sm:border-b-8 border-l-transparent border-r-transparent border-b-white/30"></div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 sm:border-l-8 sm:border-r-8 sm:border-t-8 border-l-transparent border-r-transparent border-t-white/30"></div>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-r-6 sm:border-t-8 sm:border-b-8 sm:border-r-8 border-t-transparent border-b-transparent border-r-white/30"></div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-l-6 sm:border-t-8 sm:border-b-8 sm:border-l-8 border-t-transparent border-b-transparent border-l-white/30"></div>
      </div>

      {/* Right Joystick */}
      <div
        ref={rightJoystickRef}
        className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-800/70 rounded-full border-2 border-gray-600"
        onMouseDown={(e) => handleJoystickStart(e, "right")}
        onTouchStart={(e) => handleJoystickStart(e, "right")}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-700/70 border border-gray-500"></div>
        </div>
        <div
          className={`absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black border-2 ${isEmergencyStopped ? "border-red-500" : rightActive ? "border-yellow-400" : "border-gray-400"
            } flex items-center justify-center transition-all duration-100`}
          style={{
            transform: `translate(${rightPosition.x}px, ${rightPosition.y}px)`,
            left: "calc(50% - 10px)",
            top: "calc(50% - 10px)",
            boxShadow: rightActive ? "0 0 10px rgba(255, 215, 0, 0.5)" : "none",
          }}
        >
          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${rightActive ? "bg-yellow-400" : "bg-gray-400"}`}></div>
        </div>
        {/* Directional indicators */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 sm:border-l-8 sm:border-r-8 sm:border-b-8 border-l-transparent border-r-transparent border-b-white/30"></div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 sm:border-l-8 sm:border-r-8 sm:border-t-8 border-l-transparent border-r-transparent border-t-white/30"></div>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-r-6 sm:border-t-8 sm:border-b-8 sm:border-r-8 border-t-transparent border-b-transparent border-r-white/30"></div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-l-6 sm:border-t-8 sm:border-b-8 sm:border-l-8 border-t-transparent border-b-transparent border-l-white/30"></div>
      </div>
    </div>
  )
}
