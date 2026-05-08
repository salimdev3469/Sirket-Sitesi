import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1c3759',
        'primary-hover': '#152b46',
        light: '#e8e8e8',
        white: '#ffffff',
        text: 'rgba(28, 55, 89, 0.95)',
        muted: 'rgba(28, 55, 89, 0.72)',
        subtle: 'rgba(28, 55, 89, 0.52)',
        border: 'rgba(28, 55, 89, 0.18)'
      },
      spacing: {
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
        margin: '32px',
        gutter: '24px',
        section: '80px'
      },
      maxWidth: {
        container: '1280px'
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        lg: '8px'
      },
      fontFamily: {
        headline: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        code: ['monospace']
      },
      fontSize: {
        'headline-xl': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }],
        code: ['14px', { lineHeight: '1.5', fontWeight: '400' }]
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(28,55,89,0.08), 0 2px 4px -1px rgba(28,55,89,0.05)'
      }
    }
  },
  plugins: []
};

export default config;
