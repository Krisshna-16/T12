# GO-BRICS Task Submission Automation — Workflow Documentation

An interactive, high-fidelity React web application documenting the live, multi-step automation workflow deployed for **GO-BRICS Business Lab**. This system automates participant task submissions from Google Forms to Google Sheets master trackers and dispatches instant Telegram alerts.

---

## 🛠️ Technology Stack & Styling

- **Core**: React 19 (Vite)
- **Styling**: Tailwind CSS v4
- **Typography**: Inter (Google Fonts)
- **Icons**: Lucide React
- **Design Palette**: High-contrast premium cyber theme
  - Background: Black (`#0A0A0A`)
  - Accent: Vibrant green (`#00FF41`)
  - Cards: Charcoal (`#1A1A1A`)
  - Flow Validation Node: Blue (`#4A9EFF`)
  - Flow Calculation Node: Gold (`#C9A84C`)

---

## 🌟 Key Application Features

1. **Dashboard Overview (Tab 1)**:
   - Tracks operational execution metrics: success rate (97.9%), average latency (3.2 seconds), and total executions.
   - Highlights business value: 6 hours/week saved, 0 missed notifications, and total submissions processed.
   
2. **Interactive Flowchart (Tab 2)**:
   - Displays all 6 steps in the automation workflow.
   - Includes custom, keyframe-animated pulsing SVG connectors to visualize the live data flow.
   - Clickable nodes expand using React state to show backend parameters and technical payloads.
   - Showcases a dedicated branching route to a red-bordered **Error Handler** node mapping Step 2's validation exceptions.

3. **Live n8n Run Simulator (Design Spell)**:
   - Click the **"Simulate Live Run"** button in the header.
   - The application runs an animated step-by-step simulator, printing live system logs in a mock terminal block.
   - On completion, it inserts a new successful run record to the top of the test logs, recalculating all overview execution metrics dynamically.

4. **Test Run Log & Export (Tab 3)**:
   - Interactive table detailing historical executions over the last 3 days.
   - "Download Log CSV" button compiles table records into a Blob file and initiates an immediate browser download.

5. **Error & Incident Management (Tab 4)**:
   - Summarizes triggers, detection criteria, and mitigation script operations for 4 common exception types (Missing Task ID, Missing Proof Link, Sheets API Timeout, Telegram bot offline).
   - Provides checklist instructions for daily operational maintenance.
   - "Download Full Report PDF" triggers native `window.print()` using customized print styles.

---

## 📂 Project Structure

```bash
go-brics-task-automation/
├── src/
│   ├── App.jsx          # Main application file (dashboard components, simulation engine, CSV exporter)
│   ├── index.css        # Tailwind directive entry & custom keyframe animation classes
│   └── main.jsx         # React application mounting file
├── index.html           # Document wrapper loading Inter Font
├── vite.config.js       # Vite configuration with Tailwind plugins and '/T12-go-bricks/' base path
├── package.json         # Package dependencies (React, Tailwind v4, Lucide Icons)
└── README.md            # Project documentation (this file)
```

---

## ⚙️ How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173/T12-go-bricks/](http://localhost:5173/T12-go-bricks/) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates statically compiled files in the `dist` folder, pre-configured for deployment under the `/T12-go-bricks/` path.
