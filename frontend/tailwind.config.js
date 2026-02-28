/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1E3A8A',
          accent: '#14B8A6',
          success: '#16A34A',
          warning: '#F59E0B',
          danger: '#DC2626'
        }
      },
      boxShadow: {
        soft: '0 10px 25px -12px rgba(30,58,138,0.2)'
      }
    }
  },
  plugins: []
}
