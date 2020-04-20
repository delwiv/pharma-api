import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(`.env.${process.env.NODE_ENV}`) })
