import { Bell, Signal, Menu } from "lucide-react"
import { useState } from "react"

interface TopHUDProps {
  metrics: {
    distance: number
    runningTime: { hours: number; minutes: number }
    latitude: string
    status: string
    longitude: string
    elevation: number
    temperature: number
    battery: number
    notifications: number
    dateTime: Date
  }
  onMenuClick?: () => void
}

export default function TopHUD({ metrics, onMenuClick }: TopHUDProps) {
  const [showMobileMetrics, setShowMobileMetrics] = useState(false);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(date)
  }

  const handleMenuClick = () => {
    setShowMobileMetrics(!showMobileMetrics);
    if (onMenuClick) {
      onMenuClick();
    }
  }

  return (
    <div className="absolute top-0 left-0 right-0 z-20">
      <div className="relative">
        {/* SVG Background */}
        <svg className="w-full" height="70" viewBox="0 0 1200 70" preserveAspectRatio="none">
          {/* Main HUD shape */}
          <path d="M0,0 H1200 V50 L1150,60 H650 L600,70 L550,60 H50 L0,50 Z" fill="#000" fillOpacity="0.85" />
        </svg>

        {/* Content container */}
        <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
              <div className="absolute inset-1 rounded-full bg-blue-700"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-blue-400 font-bold text-xs sm:text-sm">Oinride®</span>
              <span className="text-gray-400 text-[10px] sm:text-xs">ControlWire™</span>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={handleMenuClick}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop Metrics */}
          <div className="hidden md:grid grid-cols-7 divide-x divide-gray-700/50">
            <MetricBox label="Distance" value={`${metrics.distance.toFixed(0)} m`} />
            <MetricBox label="Running" value={`${metrics.runningTime.hours}h ${metrics.runningTime.minutes}m`} />
            <MetricBox label="Latitude" value={metrics.latitude} />
            <StatusBox status={metrics.status} />
            <MetricBox label="Longitude" value={metrics.longitude} />
            <MetricBox label="Elevation" value={`${metrics.elevation} m`} />
            <MetricBox label="Temperature" value={`${metrics.temperature} °C`} />
          </div>

          {/* Status Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            <div className="relative">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] sm:text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                {metrics.notifications}
              </span>
            </div>
            <Signal className="h-4 w-4 sm:h-5 sm:w-5" />
            <div className="flex items-center gap-1">
              <div className="relative w-5 h-3 sm:w-6 sm:h-4">
                <div className="absolute inset-0 border border-white rounded-sm"></div>
                <div
                  className="absolute top-0 bottom-0 left-0 bg-green-500 rounded-sm"
                  style={{ width: `${metrics.battery}%` }}
                ></div>
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-2 bg-white rounded-r-sm"></div>
              </div>
              <span className="text-[10px] sm:text-xs">{Math.round(metrics.battery)}%</span>
            </div>
            <div className="hidden sm:flex flex-col items-end text-[10px] sm:text-xs">
              <span>{formatDate(metrics.dateTime)}</span>
              <span>{formatTime(metrics.dateTime)}</span>
            </div>
          </div>
        </div>

        {/* Mobile Metrics Dropdown */}
        {showMobileMetrics && (
          <div className="absolute top-16 left-0 right-0 bg-black/85 md:hidden z-20 p-2 grid grid-cols-2 gap-2">
            <MetricBox label="Distance" value={`${metrics.distance.toFixed(0)} m`} />
            <MetricBox label="Running" value={`${metrics.runningTime.hours}h ${metrics.runningTime.minutes}m`} />
            <MetricBox label="Latitude" value={metrics.latitude} />
            <StatusBox status={metrics.status} />
            <MetricBox label="Longitude" value={metrics.longitude} />
            <MetricBox label="Elevation" value={`${metrics.elevation} m`} />
            <MetricBox label="Temperature" value={`${metrics.temperature} °C`} />
            <div className="flex flex-col items-start text-[10px]">
              <span>{formatDate(metrics.dateTime)}</span>
              <span>{formatTime(metrics.dateTime)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center px-1 sm:px-2">
      <span className="text-gray-400 text-[10px] sm:text-xs uppercase">{label}</span>
      <span className="text-white text-[10px] sm:text-xs font-semibold">{value}</span>
    </div>
  )
}

function StatusBox({ status }: { status: string }) {
  return (
    <div className="flex flex-col items-center px-1 sm:px-2">
      <span className="text-gray-400 text-[10px] sm:text-xs uppercase">STATUS</span>
      <span className="bg-green-500 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 rounded-sm font-bold">{status ? status : "OK"}</span>
    </div>
  )
}
