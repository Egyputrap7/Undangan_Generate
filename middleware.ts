import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // Import tipe NextRequest

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname === '/') {
    url.pathname = '/form';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
