import { NextResponse } from 'next/server'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function GET(request: Request) {
    return NextResponse.json({ Nice: request }, { status: 200 })
}


export async function POST(request: Request) {
    const formData = await request.json()
    const id = formData['id']
    const db = await open({
        filename: 'database/DB.db',
        driver: sqlite3.Database
    })
    let result = {
        "id": "",
        "idea": "",
        "audience": "",
        "point": "",
        "brief": "",
        "review": "",
        "priority": "",
        "priority_status": "",
        "budget": "",
        "budget_status": "",
        "consequence": "",
        "consequence_status": "",
        "competition": "",
        "competition_status": "",
        "differ": "",
        "differ_status": "",
        "marketing": "",
        "marketing_status": ""
    }
    const res = await db.get('SELECT * FROM Post Where id = ?', id)
    if (res) {
        result = res
    }
    return NextResponse.json({ Data: result }, { status: 200 })
}