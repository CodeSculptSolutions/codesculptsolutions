import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CodeSculptSolutions — Built with Code. Crafted with Purpose.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F5F0EB',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: '#9B8EA0',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
          }}
        >
          codesculptsolutions.com
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#1B1A1F',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
            }}
          >
            Built with Code.{'\n'}Crafted with Purpose.
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#6B6470',
              maxWidth: '680px',
              lineHeight: 1.5,
            }}
          >
            A software studio in Cebu building web apps, mobile apps, and custom systems for teams who care about craft.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          {['Web', 'Mobile', 'UI/UX', 'Systems'].map((s) => (
            <div
              key={s}
              style={{
                fontSize: 14,
                color: '#9B8EA0',
                border: '1px solid #C9A9C7',
                borderRadius: '4px',
                padding: '6px 14px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
