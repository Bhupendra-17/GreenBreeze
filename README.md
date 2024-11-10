# GreenBreeze 🍃

## Overview
**GreenBreeze** is a web-based platform designed to calculate the required plantation area to improve air quality (AQI) in a specific region. It allows users to input data related to a city or specific environmental parameters such as population, area, AQI, and vegetation index, providing data-driven insights for individuals, organizations, and policymakers to promote sustainable environmental development.

## Features
- **Calculate Required Plantation Area**: Based on city population, area, AQI, and vegetation index inputs.
- **Fetch Real-time AQI Data**: Using a third-party AQI API.
- **Display Pollution Control Measures**: Based on AQI levels and user inputs.
- **City Lookup**: Check city data from a CSV source and return relevant information or a "city not found" message if unavailable.
  
## Technology Stack
### Frontend:
- **React.js**: Interactive UI components.
- **Tailwind CSS**: Responsive design and styling.

### Backend:
- **Node.js & Express.js**: Server-side logic and API handling.
- **CSV Data Source**: Contains city population and area data.
- **AQI API**: Fetches real-time AQI data.

### Hosting:
- **Vultr Cloud Hosting**: For backend and database deployment.
  
## Architecture
The architecture is divided into the **Frontend**, **Backend**, and **Data Sources** sections. The communication between the client and server is performed via HTTP requests.

- **Frontend**: Contains React components to request AQI data and display results.
- **Backend**: Node.js processes requests, fetches city data from CSV, and fetches AQI data from an API.
- **Data Sources**: Includes a CSV file with city details and a real-time AQI API for fetching environmental data.

## Usage
1. **Input City Data**: The user can input the name of a city or manually input details such as population, area, vegetation index, and current AQI.
2. **Calculate Plantation Area**: The platform processes the input data to compute the required plantation area.
3. **View Pollution Control Measures**: Suggested actions based on the current AQI level are displayed.
4. **Get Real-time AQI Data**: Users can fetch real-time AQI information via the AQI API.
   
## Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) installed.
- [React.js](https://reactjs.org/) development environment.

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Bhupendra-17/GreenBreeze.git
   cd GreenBreeze
2. Install Dependencies:
    ```bash 
    npm install
3. Change the directory
    ```bash
    cd client
4. Run the client locally
    ```bash
    npm run dev
5. Open another terminal

6. Change the directory
    ```bash
    cd server
7. Run the server locally
    ```bash
    npm run dev
