interface SpeedDisplayProps {
  speed: number
  isEmergencyStopped: boolean
}

export default function SpeedDisplay({ speed, isEmergencyStopped }: SpeedDisplayProps) {
  return (
    <div className="absolute bottom-28 sm:bottom-32 left-0 right-0 flex justify-center items-center z-10">
      <div className="text-center">
        <div className={`text-4xl sm:text-6xl font-bold ${isEmergencyStopped ? "text-red-500" : "text-white"}`}>
          {speed.toFixed(1)}
        </div>
        <div className="text-gray-400 text-sm sm:text-lg">m/s</div>
      </div>
    </div>
  )
}
