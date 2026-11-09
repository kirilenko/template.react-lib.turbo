import { useState } from 'react'
import { Button } from 'template-react-lib-turbo'

export default function App() {
  const [loading, setLoading] = useState(false)

  const handleLoad = async () => {
    setLoading(true)
    await new Promise<void>((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <main style={{ margin: '0 auto', maxWidth: 800, padding: '2rem 3rem' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>
        UI Library Playground
      </h1>

      <Section title="Variants">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </Section>

      <Section title="Sizes">
        <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
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

function Section({ children, title }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ color: '#71717a', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>{children}</div>
    </section>
  )
}
