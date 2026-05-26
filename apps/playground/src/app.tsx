import { useState } from 'react'
import { Button } from '@repo/lib'

export default function App() {
  const [loading, setLoading] = useState(false)

  const handleLoad = async () => {
    setLoading(true)
    await new Promise<void>((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <main style={{ padding: '2rem 3rem', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>
        UI Library Playground
      </h1>

      <Section title="Variants">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </Section>

      <Section title="Sizes">
        <div style={{ alignItems: 'center', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      <Section title="States">
        <Button disabled>Disabled</Button>
        <Button loading={loading} onClick={handleLoad}>
          {loading ? 'Loading…' : 'Click to load'}
        </Button>
      </Section>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: '#71717a' }}>
        {title}
      </h2>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>{children}</div>
    </section>
  )
}
