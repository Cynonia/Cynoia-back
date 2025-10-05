import fs from 'fs'
import path from 'path'
import specs from '../src/config/swagger.js'

const out = path.resolve(process.cwd(), 'openapi.json')
fs.writeFileSync(out, JSON.stringify(specs, null, 2), 'utf-8')
console.log('Wrote', out)
