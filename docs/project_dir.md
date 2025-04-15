# Next.js Bootstrap App

## Overview

This project is a Next.js application integrated with Bootstrap for styling. It serves as a template for building modern web applications with a responsive design and a clean user interface.

## Project Structure

The project is organized as follows:

```
nextjs-bootstrap-app/
├── public/                  # Static files
│   └── favicon.ico          # Site favicon
├── src/                     # Source code
│   ├── pages/               # Application pages
│   │   ├── _app.tsx         # Custom App component
│   │   ├── index.tsx        # Homepage
│   │   └── about.tsx        # About page
│   ├── components/          # Reusable components
│   │   └── Navbar.tsx       # Navigation bar component
│   ├── styles/              # Stylesheets
│   │   ├── globals.css       # Global styles
│   │   ├── bootstrap.min.css  # Bootstrap CSS
│   │   └── modal.css         # Modal component styles (imported in _app.tsx)
│   └── utils/               # Utility functions
│       └── index.ts         # Utility functions
├── .gitignore               # Git ignore file
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Getting Started

To run the development server, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Features

- Responsive design using Bootstrap
- Custom App component for global state management
- Multiple pages including a homepage and an About page
- Reusable components for better code organization

## Technologies Used

- **Next.js** - React framework for server-side rendering and static site generation
- **Bootstrap** - CSS framework for responsive design
- **TypeScript** - For type safety and improved developer experience

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
