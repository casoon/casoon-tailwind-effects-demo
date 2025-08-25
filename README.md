# @casoon/tailwindcss-effects Demo

> **⚠️ Alpha Stage** - This project is currently in active development. Features may change and bugs may exist. Not recommended for production use yet.

A modern demo website showcasing the powerful CSS effects library `@casoon/tailwindcss-effects` built with Astro and Tailwind CSS v4.

## ✨ Features

- **Glassmorphism Effects**: Beautiful translucent UI elements with backdrop-filter effects
- **Orbs Backgrounds**: Dynamic animated background effects with radial gradients
- **Interactive Components**: Hover effects, animations, and responsive design
- **Modern UI**: Clean, contemporary design with excellent contrast and readability
- **Responsive Design**: Optimized for all devices and screen sizes

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd casoon-tailwind-effects-demo
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
   Navigate to `http://localhost:4321`

## 🏗️ Project Structure

```
src/
├── layouts/
│   └── Base.astro          # Main layout with configurable navigation
├── pages/
│   ├── index.astro         # Homepage with hero section and feature cards
│   ├── components.astro    # Component showcase page
│   └── playground.astro    # Interactive playground for testing effects
├── styles/
│   └── app.css            # Main stylesheet with Tailwind and effects imports
└── components/
    └── ComponentShowcase.astro  # Reusable component showcase
```

## 🎨 Available Components

### Glass Effects
- `glass` - Core glassmorphism effect
- `glass-light` - Light variant for bright backgrounds
- `glass-card` - Glass card components
- `glass-card-light` - Light glass cards
- `glass-button` - Glass-styled buttons
- `glass-button-primary` - Primary action buttons
- `glass-sheen` - Glass effect with top highlight

### Background Effects
- `bg-orbs-hero` - Dynamic hero background with animated orbs
- `bg-orbs-subtle` - Subtle background effects

### Interactive Elements
- Hover animations and transitions
- Responsive grid layouts
- Modern form inputs with glass styling

## 🎯 CSS Custom Properties

The library provides CSS custom properties for easy customization:

```css
:root {
  --glass-radius: 1.25rem;
  --glass-blur: 12px;
  --glass-border: rgba(255,255,255,.15);
  --glass-bg: rgba(255,255,255,.08);
}
```

## ⚙️ Configuration

### Navigation Themes
The navigation automatically adapts to different page backgrounds:

- **Homepage**: Light theme (`navTheme="light"`)
- **Other pages**: Dark theme (`navTheme="dark"`)

### Responsive Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🎮 Live Demo

Visit the demo to see all effects in action:
- **Homepage**: Hero section with animated orbs and glass cards
- **Components**: Interactive showcase of all available effects
- **Playground**: Test and customize effects in real-time

## 🛠️ Built With

- **[Astro](https://astro.build)** - Modern web framework
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **[@casoon/tailwindcss-effects](https://github.com/casoon/tailwindcss-effects)** - CSS effects library

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with the amazing `@casoon/tailwindcss-effects` library
- Inspired by modern glassmorphism design trends
- Community feedback and contributions

---

**Made with ❤️ by the Casoon team**
