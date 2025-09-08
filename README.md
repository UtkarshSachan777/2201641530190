# URL Shortener

A modern, fast, and user-friendly URL shortener application built with React, TypeScript, and Tailwind CSS. This project allows users to shorten long URLs, generate QR codes for easy sharing, and view statistics on link usage.

## 🚀 Live Demo

Check out the live application here: [https://lovable.dev/projects/dd16dc60-4e51-4a84-ad5c-c531b53764b4](https://lovable.dev/projects/dd16dc60-4e51-4a84-ad5c-c531b53764b4)

## ✨ Features

- **URL Shortening**: Quickly shorten long URLs into compact, shareable links.
- **QR Code Generation**: Generate QR codes for shortened URLs for easy mobile access.
- **Statistics Dashboard**: View click statistics and analytics for your shortened links.
- **Responsive Design**: Fully responsive UI that works seamlessly on desktop, tablet, and mobile devices.
- **Customizable Links**: Option to create custom short links (if implemented).
- **Dark/Light Mode**: Toggle between dark and light themes for better user experience.
- **Fast and Secure**: Built with modern web technologies for optimal performance and security.

## 🛠️ Technologies Used

This project is built with the following technologies:

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (Accordion, Dialog, Dropdown, etc.)
- **State Management**: React Query for data fetching
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts for statistics visualization
- **QR Code Generation**: qrcode library
- **Animation**: Framer Motion
- **Routing**: React Router DOM
- **Date Handling**: date-fns
- **Other Libraries**: clsx, tailwind-merge, sonner (toast notifications), vaul (drawer), etc.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (version 18 or higher)
- npm or yarn package manager

## 🚀 Installation and Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 📖 Usage

1. **Shorten a URL**:
   - Enter a long URL in the input field on the main page.
   - Click the "Shorten" button.
   - Your shortened URL will be generated and displayed.

2. **Generate QR Code**:
   - After shortening a URL, click on the QR code icon to generate a QR code.
   - Download or share the QR code as needed.

3. **View Statistics**:
   - Navigate to the Statistics page to view click analytics for your shortened links.
   - Use the charts and graphs to analyze link performance.

4. **Customize Links** (if available):
   - Use the custom link feature to create personalized short URLs.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components (buttons, inputs, etc.)
│   ├── Navigation.tsx
│   ├── URLShortenerForm.tsx
│   └── ...
├── pages/
│   ├── Index.tsx    # Home page
│   ├── NotFound.tsx # 404 page
│   └── Statistics.tsx # Statistics dashboard
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── App.tsx          # Main app component
├── main.tsx         # App entry point
└── ...
```

## 🚀 Deployment

### Using Vercel (Recommended)

1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the Vite configuration and deploy the app.
3. Your app will be live at a Vercel-provided URL.

### Using Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify.
3. Configure the build settings if necessary.

### Using Other Hosting Providers

1. Build the project: `npm run build`
2. Upload the contents of the `dist` folder to your hosting provider.
3. Ensure your hosting provider supports single-page applications (SPA) routing.

## 🌐 Connecting a Custom Domain

To connect a custom domain:

1. Purchase a domain from a domain registrar (e.g., Namecheap, GoDaddy).
2. In your hosting provider's dashboard, go to the domain settings.
3. Add your custom domain and configure DNS records as instructed.
4. Update your domain's DNS settings to point to your hosting provider's servers.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

### Development Guidelines

- Follow the existing code style and conventions.
- Write clear, concise commit messages.
- Test your changes thoroughly before submitting a PR.
- Update documentation as needed.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

If you have any questions or suggestions, feel free to open an issue or contact the maintainers.

## 🙏 Acknowledgments

- Thanks to the React and Vite communities for excellent documentation.
- UI components inspired by shadcn/ui.
- Icons provided by Lucide React.

