'use client'

import { NextStudio } from 'next-sanity/studio'
import { useEffect, useState } from 'react'

export default function StudioPage() {
  const [projectId, setProjectId] = useState<string | undefined>(undefined)
  const [config, setConfig] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check environment variable (available at runtime in client components)
    const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    setProjectId(id)

    if (!id) {
      setError('NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
      return
    }

    // Dynamically import config only if project ID exists
    import('@/sanity.config')
      .then((module) => {
        setConfig(module.default)
      })
      .catch((err) => {
        console.error('Failed to load Sanity config:', err)
        setError('Failed to load Sanity configuration')
      })
  }, [])

  if (error || !projectId) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#e11d48' }}>
          Sanity Studio Configuration Error
        </h1>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          {error || 'NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Please add it to your .env.local file.'}
        </p>
        <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: '600' }}>Setup Instructions:</h2>
          <ol style={{ marginLeft: '1.5rem', lineHeight: '2', color: '#333' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              Create a Sanity project at{' '}
              <a
                href="https://sanity.io/manage"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2563eb', textDecoration: 'underline' }}
              >
                sanity.io/manage
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>Copy your Project ID from the project settings</li>
            <li style={{ marginBottom: '0.5rem' }}>
              Add to <code style={{ background: '#e0e0e0', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.9em' }}>app/.env.local</code>:
              <pre
                style={{
                  background: '#fff',
                  padding: '1rem',
                  marginTop: '0.5rem',
                  borderRadius: '4px',
                  overflow: 'auto',
                  border: '1px solid #ddd',
                  fontSize: '0.9em',
                }}
              >
                {`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production`}
              </pre>
            </li>
            <li>Restart your dev server (stop and run <code style={{ background: '#e0e0e0', padding: '0.2rem 0.4rem', borderRadius: '2px' }}>pnpm dev</code> again)</li>
          </ol>
        </div>
      </div>
    )
  }

  if (!config) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'system-ui', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Loading Sanity Studio...</h1>
      </div>
    )
  }

  return <NextStudio config={config} />
}
