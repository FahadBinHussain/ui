import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');
    
    if (!file || !['switch.glb', 'cross.jpg'].includes(file)) {
      return new NextResponse('Invalid file', { status: 400 });
    }
    
    const filePath = path.join(process.cwd(), 'app', 'showcase', '3d-animated-switch', file);
    const fileBuffer = await readFile(filePath);
    
    const contentType = file.endsWith('.glb') ? 'model/gltf-binary' : 'image/jpeg';
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}
