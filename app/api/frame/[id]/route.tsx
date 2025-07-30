// app/api/frame/[id]/route.ts
import { ImageResponse } from 'next/og';
import { getTraits } from '@/lib/traits';
import { generateImage } from '@/lib/generateImage';

export const runtime = 'edge';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const tokenId = Number(params.id);
  if (Number.isNaN(tokenId)) {
    return new Response('Invalid token ID', { status: 400 });
  }
  const traits = getTraits(tokenId);
  const svg = generateImage(traits);
  const svgEncoded = encodeURIComponent(svg);
  const imageUrl = `data:image/svg+xml;utf8,${svgEncoded}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          width: '100%',
          height: '100%',
          fontFamily: 'monospace',
        }}
      >
        <img src={imageUrl} width="200" height="200" alt={`Tomagotchu #${tokenId}`} />
        <p style={{ marginTop: 20, fontSize: 24 }}>Tomagotchu #{tokenId}</p>
      </div>
    ),
    { width: 600, height: 400 }
  );
}
