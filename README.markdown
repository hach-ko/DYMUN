# DYMUN 2025 - Model United Nations

![DYMUN Logo](https://raw.githubusercontent.com/hach-ko/DYMUN/refs/heads/main/mun/public/DYMUN.png)

Welcome to the official repository for **DYMUN 2025**, a dynamic Model United Nations platform designed to foster diplomacy, critical thinking, and global awareness among students from Primary to High School. This project powers the DYMUN website, providing an immersive experience for delegates, organizers, and attendees of the conference held on **October 10-11, 2025**, at D Y Patil International School, Navi Mumbai, India.

## Table of Contents

- About DYMUN
- Features
- Getting Started
- Contributing
- Contact Us
- License

## About DYMUN

DYMUN (Dynamic Model United Nations) is an exciting platform where students step into the roles of global leaders to debate, negotiate, and resolve pressing international issues. Held over two days, DYMUN 2025 brings together young minds to sharpen their skills in diplomacy, public speaking, and collaboration.

This repository contains the codebase for the DYMUN website, built with **React**, **Tailwind CSS**, and modern JavaScript. The site includes pages for registration, resources, team information, and contact details, all designed to provide a seamless user experience across devices.
## Getting Started

To run the DYMUN website locally or contribute to its development, follow these steps:

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- A modern web browser (e.g., Chrome, Firefox)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/hach-ko/DYMUN.git
   cd DYMUN
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server**:

   ```bash
   npm start
   # or
   yarn start
   ```

   The app will be available at `http://localhost:3000`.

4. **Build for Production**:

   ```bash
   npm run build
   # or
   yarn build
   ```

### Project Structure

```
DYMUN/
├── src/
│   ├── components/        # Reusable UI components (Button, Card, Sidebar, etc.)
│   ├── Entities/          # JSON data for User, Committee, etc.
│   ├── lib/               # Utility functions (e.g., createPageUrl)
│   ├── Pages/             # Page components (Home, AboutUs, Connect, etc.)
│   ├── Layout.jsx         # Main layout with responsive sidebar
│   └── index.js           # Entry point
├── public/                # Static assets (images, favicon, etc.)
├── package.json           # Project dependencies and scripts
└── README.md              # This file
```

## Contributing

We welcome contributions from the community to make DYMUN 2025 even better! Here's how you can help:

1. **Fork the Repository**: Click the "Fork" button on GitHub to create your own copy.

2. **Create a Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**: Implement your feature or bug fix, following the project's coding style.

4. **Test Locally**: Ensure your changes work across mobile, tablet, and desktop devices.

5. **Submit a Pull Request**: Push your branch and create a PR with a clear description of your changes.

### Guidelines

- Follow the existing code style (ESLint/Prettier rules enforced).
- Write clear, concise commit messages (e.g., `Add responsive sidebar toggle for mobile`).
- Test for responsiveness and accessibility.
- Avoid introducing breaking changes to existing pages (e.g., Connect, AboutUs).

## Contact Us

Have questions or need support? Reach out to the DYMUN team:

- **Email**: info@dymun2025.com
- **Instagram**: @dymun.nerul
- **Venue**:
  D Y Patil International School
  Sector 7, Nerul, Navi Mumbai
  Maharashtra 400706, India

- **Support Hours**:
  - Monday–Friday: 9:00 AM–6:00 PM IST
  - Saturday: 10:00 AM–4:00 PM IST
  - Sunday: Closed
  - During conference (Oct 10-11, 2025): 24/7 support

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

*Built with 💙 by Dhruv Raina*
