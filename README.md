# Robot Control Interface

A modern, responsive web application for remote operation of robotic systems in tunnel environments. Built with React, TypeScript, and Tailwind CSS.

## Features

### Visualization Modes

- **Camera View**: Real-time video feed with customizable lighting options
- **3D Map**: Three-dimensional representation of the robot's environment
- **2D Map**: Top-down view with path visualization

### Control Systems

- **Dual Joystick Controls**: Intuitive movement control with touch/mouse support
- **Drive Modes**: Switch between Auto, Semi-Auto, and Manual operation
- **Speed Control**: Adjust speed with 0.5x, 1x, and 2x multipliers
- **Emergency Stop**: Instantly halt all robot operations

### Lighting Options

- **Standard Light**: General illumination
- **Spot Light**: Focused beam for detailed inspection
- **Laser**: Precision targeting for measurements

### Telemetry Display

- **Speed Indicator**: Real-time velocity monitoring
- **Angle Indicators**: Orientation and inclination visualization
- **Status Metrics**: Distance traveled, running time, GPS coordinates, and more

### Responsive Design

- **Mobile Optimization**: Full functionality on smartphones and tablets
- **Adaptive Layout**: Automatically adjusts to different screen sizes
- **Touch-Friendly Controls**: Designed for both touch and mouse interaction

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/robot-control-interface.git
cd robot-control-interface
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Development

This project was created with Vite, React, and TypeScript. The UI is built with Tailwind CSS for responsive design.

### Project Structure

- `src/components/controls/`: UI controls for robot operation
- `src/components/displays/`: Display components for telemetry and status
- `src/components/hud/`: Heads-up display components
- `src/components/robot-control-interface.tsx`: Main container component
- `src/components/video-feed.tsx`: Visualization component for different view modes

### Key Components

- **RobotControlInterface**: Main container component
- **TopHUD**: Displays critical metrics and status information
- **VideoFeed**: Renders different visualization modes
- **JoystickControls**: Handles movement input
- **ControlButtons**: Manages operation modes and settings
- **AngleIndicators**: Shows orientation information
- **SpeedDisplay**: Displays current velocity
- **MapToggle**: Switches between visualization modes
