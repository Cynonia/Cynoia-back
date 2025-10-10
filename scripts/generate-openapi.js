import fs from 'fs'
import path from 'path'

const distSpecPath = path.resolve(process.cwd(), 'dist/config/swagger.js')
if (!fs.existsSync(distSpecPath)) {
	console.error('dist/config/swagger.js not found. Please run `npm run build` first.')
	process.exit(1)
}

const { default: specs } = await import(path.toNamespacedPath('file://' + distSpecPath))

const out = path.resolve(process.cwd(), 'openapi.json')
fs.writeFileSync(out, JSON.stringify(specs, null, 2), 'utf-8')
console.log('Wrote', out)
