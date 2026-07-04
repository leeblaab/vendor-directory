import { NextRequest, NextResponse } from 'next/server';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

async function proxyRequest(
  request: NextRequest,
  path: string[],
  method: string
) {
  try {
    const targetPath = path.join('/');
    const queryString = request.nextUrl.search;
    const targetUrl = `${DIRECTUS_URL}/${targetPath}${queryString}`;

    console.log(`Proxying ${method} ${targetUrl}`);

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const response = await fetch(targetUrl, {
      method,
      headers,
      body: method !== 'GET' && method !== 'DELETE'
        ? await request.text()
        : undefined,
    });

    const contentType = response.headers.get('content-type');
    
    // ✅ FIXED: Handle binary assets (images) properly using arrayBuffer
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      return new NextResponse(JSON.stringify(data), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (contentType?.startsWith('image/') || contentType?.startsWith('video/') || contentType?.startsWith('audio/')) {
      // Binary assets - use arrayBuffer to preserve binary data
      const data = await response.arrayBuffer();
      return new NextResponse(data, {
        status: response.status,
        headers: { 
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } else {
      // Text-based responses
      const data = await response.text();
      return new NextResponse(data, {
        status: response.status,
        headers: { 'Content-Type': contentType || 'text/plain' },
      });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { 
        errors: [{ 
          message: 'Failed to connect to Directus backend',
          extensions: { code: 'PROXY_ERROR' }
        }] 
      },
      { status: 502 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path, 'POST');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path, 'PATCH');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(request, path, 'DELETE');
}