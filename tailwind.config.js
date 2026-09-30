/** @type {import('tailwindcss').Config} */
// Los colores y las fuentes salen de las variables de src/styles.css, y los tamaños de texto
// de la escala de @c-code/c-code-fw/ui (tokens.css). Así el sitio y los componentes comparten
// la misma paleta y el mismo ritmo tipográfico. El espaciado de Tailwind (múltiplos de 4px)
// ya coincide con --cc-space-*.
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--laurel-green)',
        primary_light: 'var(--laurel-green-light)',
        primary_dark: 'var(--laurel-green-dark)',
        secondary_light: 'var(--laurel-cream)',
        secondary: 'var(--laurel-gold)',
        secondary_dark: 'var(--laurel-gold-dark)',
        secondary_text: 'var(--laurel-gold-text)',
        bg: 'var(--laurel-mint)',
        stone: 'var(--laurel-stone)',
      },
      fontSize: {
        xs: ['var(--cc-text-xs)', { lineHeight: 'var(--cc-leading-snug)' }],
        sm: ['var(--cc-text-sm)', { lineHeight: 'var(--cc-leading-snug)' }],
        base: ['var(--cc-text-md)', { lineHeight: 'var(--cc-leading-body)' }],
        lg: ['var(--cc-text-lg)', { lineHeight: 'var(--cc-leading-body)' }],
        xl: ['var(--cc-text-xl)', { lineHeight: 'var(--cc-leading-snug)' }],
        '2xl': ['var(--cc-text-2xl)', { lineHeight: 'var(--cc-leading-tight)' }],
        '3xl': ['var(--cc-text-3xl)', { lineHeight: 'var(--cc-leading-tight)' }],
        '4xl': ['var(--cc-text-4xl)', { lineHeight: 'var(--cc-leading-tight)' }],
      },
      maxWidth: {
        site: '80rem',
      },
    },
    fontFamily: {
      sans: ['var(--laurel-font-body)'],
      heading: ['var(--laurel-font-heading)'],
      messiri: ['var(--laurel-font-heading)'],
      jost: ['var(--laurel-font-body)'],
    },
  },
  plugins: [],
}
