import { NextResponse } from 'next/server'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path';

export async function GET(request: Request) {
  return NextResponse.json({ Nice: request }, { status: 200 })
}


export async function POST(request: Request) {
  const dbPath = path.join(process.cwd(), 'database', 'DB.db');
  const formData = await request.json()
  const id = formData['id']
  const idea = formData['idea']
  const audience = formData['audience']
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })
  const result = {
    "stmt": {},
    "lastID": 0,
    "changes": 0
  }
  const postQuerry = await db.get('SELECT * FROM Post Where id = ?', id)
  if (!postQuerry) {
    const addQuerry = await db.run(
      'INSERT INTO Post (id, idea, audience) VALUES (:id, :idea, :audience)',
      {
        ':id': id,
        ':idea': idea,
        ':audience': audience
      })
    result['stmt'] = addQuerry['stmt']
    result['lastID'] = addQuerry?.['lastID'] ?? 0;
    result['changes'] = addQuerry?.['changes'] ?? 0;
  }
  return NextResponse.json({ Data: result }, { status: 200 })
}