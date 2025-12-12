import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // Reuse the Sun Logic from your Logo, tailored for a tiny icon
      <div
        style={{
          fontSize: 24,
          background: '#15803d', // Senegal Green Background
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%', // Circle shape
          color: 'white',
        }}
      >
        {/* Simple Sun Emoji or Character for the favicon */}
        ☀️
      </div>
    ),
    {
      ...size,
    }
  );
}