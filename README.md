# PlungePalz™ Website

A modern, responsive Node.js website for PlungePalz - the ultimate cold plunge tracking and community platform. Built with Express.js, EJS templating, and designed for deployment on Vercel.

## 🌟 Features

- **Modern Design**: Beautiful, responsive UI with gradient backgrounds and smooth animations
- **Mobile-First**: Fully responsive design that works perfectly on all devices
- **Fast Performance**: Optimized for speed with efficient CSS and JavaScript
- **SEO Friendly**: Proper meta tags, semantic HTML, and structured content
- **Interactive Elements**: Smooth scrolling, hover effects, and engaging animations
- **Vercel Ready**: Configured for seamless deployment on Vercel platform

## 📱 Pages

- **Home** (`/`) - Main landing page with features showcase
- **About** (`/about`) - Company mission, values, and team information
- **App** (`/app`) - Mobile app features and download links
- **PlungePoints™** (`/plungepoints`) - Rewards system explanation
- **Garmin Connect** (`/garmin`) - Garmin watch app integration details
- **404 Error** - Custom branded error page

## 🚀 Quick Start

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd plungepalz_nodejs_dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build for production
- `npm run vercel-build` - Vercel build command

## 🏗️ Project Structure

```
plungepalz_nodejs_dev/
├── public/                 # Static assets
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   └── main.js        # Client-side JavaScript
│   └── images/            # Image assets
├── views/                 # EJS templates
│   ├── layout.ejs         # Main layout template
│   ├── index.ejs          # Homepage
│   ├── about.ejs          # About page
│   ├── app.ejs            # App features page
│   ├── plungepoints.ejs   # PlungePoints rewards page
│   ├── garmin.ejs         # Garmin integration page
│   └── 404.ejs            # Error page
├── server.js              # Express server
├── package.json           # Dependencies and scripts
├── vercel.json            # Vercel deployment config
└── README.md              # This file
```

## 🎨 Design Features

### Color Scheme
- **Primary Gradient**: `#667eea` to `#764ba2`
- **Secondary Colors**: Various shades of gray and blue
- **Accent Colors**: Gold for PlungePoints™ (`#fbbf24`)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Components
- **Hero Sections**: Gradient backgrounds with compelling CTAs
- **Feature Cards**: Hover effects and smooth transitions
- **Navigation**: Responsive with mobile hamburger menu
- **Forms**: Modern styling with focus states
- **Buttons**: Multiple variants with hover animations

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect the Node.js project

2. **Environment Variables**
   No environment variables required for basic setup

3. **Build Settings**
   - Build Command: `npm run vercel-build`
   - Output Directory: (leave empty)
   - Install Command: `npm install`

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Server Configuration
- **Port**: Environment variable `PORT` or default `3000`
- **View Engine**: EJS with express-ejs-layouts
- **Static Files**: Served from `/public` directory

### Vercel Configuration
The `vercel.json` file configures:
- Node.js runtime
- Route handling
- Build settings

## 🌐 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile Browsers**: iOS Safari, Chrome Mobile

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

- **HTTPS**: Enforced in production
- **Headers**: Security headers configured
- **Dependencies**: Regularly updated for security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential. All rights reserved by PlungePalz LLC.

## 📞 Support

For support and questions:
- **Email**: Support@PlungePalz.com
- **Phone**: (949) 385-1379
- **Hours**: Monday-Friday, 9am-5pm PST

## 🔄 Updates

### Version 1.0.0
- Initial website launch
- Complete responsive design
- All core pages implemented
- Vercel deployment ready

---

**PlungePalz™ - Never Plunge Alone**

Built with ❤️ for the cold plunge community 