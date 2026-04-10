# V-Health Patient Portal

A modern, accessible patient portal UI built with **React**, **Vite**, and **Tailwind CSS**.

## Overview

This portal gives patients a clear, premium-feeling interface to manage their healthcare experience — appointments, test results, prescriptions, messages, and more — with a consistent glassmorphism design language.

### Pages

| Route | Component | Description |
|---|---|---|
| Home | `PatientPortalHome` | Dashboard with updates, quick actions, AI assistant |
| Appointments | `BookAppointmentPage` | Browse providers and schedule visits |
| Messages | `MessageCareTeamPage` | Inbox and conversation with care team |
| Test Results | `TestResultsPage` | View and understand lab and imaging results |

## Tech Stack

- **React 18** — UI components
- **Vite 5** — dev server and build tool
- **Tailwind CSS 3** — utility-first styling
- **Lucide React** — iconography
- **PostCSS + Autoprefixer** — CSS pipeline

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- npm 9 or higher

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build for Production

```bash
npm run build
```

Output is written to the `dist/` directory, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
.
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS pipeline
├── package.json
├── src/
│   ├── main.jsx            # React root mount
│   └── index.css           # Global styles + Tailwind directives
├── outputs/                # Page components
│   ├── App.jsx             # Top-level client-side router
│   ├── PatientPortalHome.jsx
│   ├── BookAppointmentPage.jsx
│   ├── MessageCareTeamPage.jsx
│   └── TestResultsPage.jsx
└── assets/                 # Static assets (logo, images)
```

## Deployment

This project can be deployed to any static hosting provider:

- **Vercel** — connect your GitHub repo and deploy automatically
- **Netlify** — drag & drop `dist/` or connect via Git
- **GitHub Pages** — use the `gh-pages` branch with `dist/`

Build command: `npm run build`  
Output directory: `dist`

## License

Private — V-Health. All rights reserved.
