import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  // Esta función maneja la configuración del servidor de socket
  return new Response('Socket server is running', { status: 200 })
} 