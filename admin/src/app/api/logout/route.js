import { NextResponse } from 'next/server';

export function GET() {
  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.delete('is-authenticated');
  return response;
}