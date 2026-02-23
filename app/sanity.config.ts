import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  console.warn('⚠️  NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity Studio will not work without it.')
  console.warn('   Please add it to your .env.local file:')
  console.warn('   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here')
}

export default defineConfig({
  name: 'superteam-academy',
  title: 'Superteam Academy CMS',
  projectId: projectId || 'placeholder', // Will show error in Studio if not set
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
