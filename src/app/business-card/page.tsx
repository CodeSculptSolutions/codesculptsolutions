'use client'

export default function BusinessCardPrintPage() {
  return (
    <div style={{ backgroundColor: '#F4EFE6', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px', padding: '48px 24px' }}>

      <div className="print:hidden" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A4751' }}>
          3.5 × 2 in — Front &amp; Back
        </p>
        <button
          onClick={() => window.print()}
          style={{
            fontFamily: "'General Sans', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '-0.01em',
            backgroundColor: '#1B1A1F',
            color: '#F4EFE6',
            border: 'none',
            borderRadius: '3px',
            padding: '12px 24px',
            cursor: 'pointer',
          }}
        >
          Print →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        <object
          data="/business-card/card-front.svg"
          type="image/svg+xml"
          style={{ width: '3.5in', height: '2in', display: 'block', boxShadow: '0 4px 24px rgba(27,26,31,0.1)' }}
          aria-label="Business card front"
        />
        <object
          data="/business-card/card-back.svg"
          type="image/svg+xml"
          style={{ width: '3.5in', height: '2in', display: 'block', boxShadow: '0 4px 24px rgba(27,26,31,0.1)' }}
          aria-label="Business card back"
        />
      </div>

      <style>{`
        @media print {
          body { margin: 0; background: white; }
          object { box-shadow: none !important; page-break-inside: avoid; }
        }
      `}</style>
    </div>
  )
}
