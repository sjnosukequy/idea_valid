import { NextResponse } from 'next/server'
// import { db } from '../../../database/sql'
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  return NextResponse.json({ request }, { status: 200 })
}


export async function POST(request: Request) {
  const formData = await request.json()
  const id = formData['id'].toLowerCase()
  const idea = formData['idea'].toLowerCase()
  const audience = formData['audience'].toLowerCase()

  const postQuerry = await sql`SELECT * FROM Post Where id = ${id} or idea = ${idea} and audience = ${audience}`
  if (postQuerry.rowCount == 0) {
    const addQuerry = await sql`INSERT INTO Post (id, idea, audience) VALUES (${id}, ${idea}, ${audience})`
    return NextResponse.json({ Data: addQuerry }, { status: 200 })
  }
  if (postQuerry.rowCount == 1) {
    return NextResponse.json({ Data: postQuerry }, { status: 201 })
  }
  return NextResponse.json({ Data: null }, { status: 200 })
}