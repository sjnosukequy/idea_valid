import { NextResponse } from 'next/server'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path';
import fs from 'fs';

export async function GET(request: Request) {
  return NextResponse.json({ Nice: request }, { status: 200 })
}


export async function POST(request: Request) {
  const dbPath = path.join('/tmp', 'database.db');
  const exists = fs.existsSync(dbPath);
  const formData = await request.json()
  const id = formData['id']
  const idea = formData['idea']
  const audience = formData['audience']
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })

  if (!exists) {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS Post (
        id TEXT NOT NULL,
        idea TEXT,
        audience TEXT,
        point TEXT,
        brief TEXT,
        review TEXT,
        priority TEXT,
        priority_status TEXT,
        budget TEXT,
        budget_status TEXT,
        consequence TEXT,
        consequence_status TEXT,
        competition TEXT,
        competition_status TEXT,
        differ TEXT,
        differ_status TEXT,
        marketing TEXT,
        marketing_status TEXT,
        CONSTRAINT Post_PK PRIMARY KEY (id)
    );
    `);
  }

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