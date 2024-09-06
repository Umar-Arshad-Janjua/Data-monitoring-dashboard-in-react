Data Monitoring Dashboard 🎯📊

Welcome to the Data Monitoring Dashboard, a sleek and powerful web application designed to provide insightful visualizations and analysis of query metrics. This project leverages the power of React, Chart.js, and CSS3 to create an intuitive and interactive dashboard for data visualization.

Tech Stack:
⚛️ React for front-end development
📊 Chart.js for dynamic, customizable data visualizations
💅 CSS3 for modern, responsive design
🔄 React Router for smooth page transitions
🎨 Dark Theme: An elegant dark mode UI with a seamless look and feel, including custom scrollbars and interactive elements.
📈 Dynamic Data Visualization: The app features multiple types of visualizations such as line charts, bar charts, pie charts, scatter plots, and doughnut charts.
🔍 Query Search & Filter: Intelligently search for and filter specific queries with the integrated autosuggestion system.
📅 Date & Time Adjustments: All query metrics are dynamically adjusted and aggregated over time for meaningful insights.
⚡ Responsive: Fully responsive design that adapts to all screen sizes—from desktop to mobile.
🕶️ Custom Scrollbars: Stylish and minimal scrollbars that match the theme perfectly.
Installation 🔧


Follow the steps below to run this project locally:

1. Clone the Repository

git clone https://github.com/Umar-Arshad-Janjua/Data-monitoring-dashboard-in-react.git

2. Install Dependencies

Make sure you have Node.js installed, then run:
npm install

3. Start the Development Server

npm start
This will run the app in development mode. Open http://localhost:3000 to view it in the browser.


Project Structure 📂
src/
├── assets/
│   └── splashScreen.json  # Lottie animation for splash screen
├── components/
│   ├── BarChart.js        # Bar chart component
│   ├── Dashboard.js       # Main dashboard component
│   ├── DoughnutChart.js   # Doughnut chart component
│   ├── LineGraph.js       # Line chart component
│   ├── Navbar.js          # Navigation bar
│   ├── ScatterPlot.js     # Scatter plot component
│   └── Suggestions.js     # Query suggestion and selection
├── styles/
│   └── Dashboard.css      # Main CSS for dashboard and components
├── utils/
│   ├── dataCleaning.js    # Data cleaning and preprocessing functions
│   └── formatChartData.js # Utility functions to format data for charts
├── App.js                 # Main app component and routes
├── App.css                # Global styles
├── index.js               # App entry point
└── reportWebVitals.js     # Performance report


Usage 📘
Dashboard Views
Overall Trend View: Aggregates metrics like MRR Score, Answer Relevancy, Faithfulness Scores over time.
Specific Query View: Dive deep into individual queries to explore their associated metrics.

Interactivity
Query Search: Easily search and filter queries using the search bar with autosuggest functionality.
Chart Customization: You can hover over charts to get exact data points and even adjust the data in real time.
Splash Screen: The app introduces itself with a smooth, 2-second splash screen animation using a Lottie animation file.

Customization 🎨
Theme
Dark Mode: The entire application has a dark-themed UI. The background, text colors, and interactive elements like buttons and charts are all themed accordingly.
Scrollbar: The scrollbar has been customized to a minimal red theme to match the dark interface.

Charts
All charts can be easily customized in src/utils/formatChartData.js.
You can tweak:
Data aggregation logic
Color schemes
Axis labels and formats

Page Transitions
You can customize page transitions using react-transition-group. Check App.js to adjust transition types and durations.

Made with ❤️ by Umar Arshad Janjua