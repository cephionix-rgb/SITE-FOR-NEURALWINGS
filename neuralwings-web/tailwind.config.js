/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Space Grotesk', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    extend: {
      colors: {
        background: {
          primary: '#18181B',     // Zinc 900 (Pure dark neutral)
          secondary: '#FAFAFA',   // Zinc 50 (Pure light neutral)
          surface: '#FFFFFF',     
        },
        primary: {
          DEFAULT: '#0EA5E9',     // Sky 500
          hover: '#0284C7',       // Sky 600
          light: '#E0F2FE',       // Sky 100
        },
        accent: {
          gold: '#F59E0B',
          sky: '#38BDF8',         // Sky 400
          slate: '#3F3F46',       // Zinc 700 (Replaced slate)
        },
        font: {
          primary: '#FFFFFF',      
          secondary: '#A1A1AA',    // Zinc 400
          muted: '#71717A',        // Zinc 500
          dark: '#18181B',         // Zinc 900
          darkSecondary: '#52525B', // Zinc 600
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#0EA5E9',         
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)',
        'gradient-surface': 'linear-gradient(180deg, rgba(24,24,27,0.9) 0%, rgba(9,9,11,0.95) 100%)',
        'gradient-surface-light': 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(250,250,250,0.8) 100%)',
        'gradient-text': 'linear-gradient(to right, #0284C7, #38BDF8)',
        'gradient-sky': 'linear-gradient(135deg, #FAFAFA 0%, #E0F2FE 100%)', 
        'gradient-gold': 'linear-gradient(to right, #F59E0B, #FCD34D)',
        'gradient-dawn': 'linear-gradient(180deg, #FAFAFA 0%, #E0F2FE 100%)', 
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(14, 165, 233, 0.5)',
        'glow-sky': '0 0 25px rgba(56, 189, 248, 0.4)',
        'glow-gold': '0 0 20px rgba(251, 191, 36, 0.3)',
        'card': '0 10px 40px -10px rgba(9, 9, 11, 0.5)',
        'card-light': '0 10px 40px -10px rgba(161, 161, 170, 0.25)',
      }
    },
  },
  plugins: [],
}
