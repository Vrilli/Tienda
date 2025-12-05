import path from 'path'
import { promises as fs } from 'fs'

const dataPath = path.join(process.cwd(), 'data', 'products.json')

export default async function handler(req, res) {
  const content = await fs.readFile(dataPath, 'utf8')
  const products = JSON.parse(content)
  res.status(200).json(products)
}