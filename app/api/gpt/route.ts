import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ Nice: request }, { status: 200 })
}


export async function POST(request: Request) {
  return NextResponse.json({ Nice: request }, { status: 200 })
}