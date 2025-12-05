module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2E8B57',
        'primary-dark': '#1F6B40',
        accent: '#FF7A18',
        'accent-dark': '#D96510',
        cream: '#E5D3B3',
        'cream-dark': '#C9B896',
        grass: '#7CB342',
        dirt: '#8B5A2B',
        stone: '#808080',
        lava: '#FF4500',
        water: '#1E90FF',
        bg: {
          light: '#F7F8FA',
          dark: '#0B1220'
        },
        surface: {
          light: '#FFFFFF',
          dark: '#111827'
        },
        text: {
          light: '#0F1724',
          dark: '#F3F4F6'
        },
        muted: {
          light: '#6B7280',
          dark: '#9CA3AF'
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'block': '4px 4px 0px rgba(0,0,0,0.2)',
        'block-hover': '6px 6px 0px rgba(0,0,0,0.25)',
        'block-dark': '4px 4px 0px rgba(0,0,0,0.5)'
      },
      borderRadius: {
        'none': '0px'
      }
    }
  },
  plugins: [],
}
