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
    const {
        id,
        idea,
        audience,
        point,
        brief,
        review,
        priority,
        priority_status,
        budget,
        budget_status,
        consequence,
        consequence_status,
        competition,
        competition_status,
        differ,
        differ_status,
        marketing,
        marketing_status
    } = await request.json();

    const result = {
        "stmt": {},
        "lastID": 0,
        "changes": 0
    }

    if (
        id &&
        idea &&
        audience &&
        point &&
        brief &&
        review &&
        priority &&
        priority_status &&
        budget &&
        budget_status &&
        consequence &&
        consequence_status &&
        competition &&
        competition_status &&
        differ &&
        differ_status &&
        marketing &&
        marketing_status
    ) {
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

        const addQuerry = await db.run(
            'UPDATE Post set ' +
            'idea = :idea, ' +
            'audience = :audience, ' +
            'point = :point, ' +
            'brief = :brief, ' +
            'review = :review, ' +
            'priority = :priority, ' +
            'priority_status = :priority_status, ' +
            'budget = :budget, ' +
            'budget_status = :budget_status, ' +
            'consequence = :consequence, ' +
            'consequence_status = :consequence_status, ' +
            'competition = :competition, ' +
            'competition_status = :competition_status, ' +
            'differ = :differ, ' +
            'differ_status = :differ_status, ' +
            'marketing = :marketing, ' +
            'marketing_status = :marketing_status ' +
            'WHERE id = :id',
            {
                ':id': id,
                ':idea': idea,
                ':audience': audience,
                ':point': point,
                ':brief': brief,
                ':review': review,
                ':priority': priority,
                ':priority_status': priority_status,
                ':budget': budget,
                ':budget_status': budget_status,
                ':consequence': consequence,
                ':consequence_status': consequence_status,
                ':competition': competition,
                ':competition_status': competition_status,
                ':differ': differ,
                ':differ_status': differ_status,
                ':marketing': marketing,
                ':marketing_status': marketing_status,
            });

        result['stmt'] = addQuerry['stmt']
        result['lastID'] = addQuerry?.['lastID'] ?? 0;
        result['changes'] = addQuerry?.['changes'] ?? 0;
    }
    return NextResponse.json({ Data: result }, { status: 200 })
}