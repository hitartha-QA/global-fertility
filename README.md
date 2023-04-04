# Tailwind CSS and Webpack
## Get started with Tailwind CSS

Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

It's fast, flexible, and reliable — with zero-runtime.

## Tailwind Build Process
1. Run the CLI tool to scan your template files for classes and build your CSS
```
npx tailwindcss -i ./src/tailwind.css -o ./development/css/style.css`

// For watch
npx tailwindcss -i ./src/tailwind.css -o ./development/css/style.css --watch
```
2. Build postcss process using npm
```
npm run dev:p-css

// For watch
npm run dev:p-css-w
```