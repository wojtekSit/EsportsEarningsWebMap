# EsportsEarningsWebMap

A WebGIS project that visualizes esports players’ earnings by country, game, and year.

## 🚀 What it does

- Aggregates player earnings data by **country**, **game**, and **year**
- Joins the aggregates with world administrative boundaries
- Renders an interactive map to explore earnings geographically
- Supports switching between games / years to see how earnings evolve

## 📁 Structure

- `DATA/` — raw and processed data (CSV, Excel, GeoJSON, etc.)
- `index.html & main.js` main web code — frontend, map logic, layers
- `package.json` — project dependencies and scripts

## 🛠 Setup & Run

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. start dev server:
   ```bash
   npm run dev
   ```
4. build for production:
   ```bash
   npm run build
   ```
