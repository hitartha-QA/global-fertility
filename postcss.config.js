module.exports = {
  plugins: {
    'postcss-import': {}, // Organize your CSS into multiple files and combine them at build time
    'tailwindcss/nesting': 'postcss-nesting', // support for nested declarations
    tailwindcss: {},
    autoprefixer: {},
  },
}
