import { NextResponse, NextRequest } from 'next/server'
// import { db } from '../../../database/sql'
import { sql } from "@vercel/postgres";

export async function GET(request: NextRequest) {
    const key = request.nextUrl.searchParams.get('key')
    const opt = request.nextUrl.searchParams.get('opt')
    const privateKey = process.env.PRIVATE_KEY
    // console.log(key)
    // console.log(privateKey == key)
    if (key == privateKey) {
        const row = await sql`SELECT * FROM Post`
        if (opt == 'download') {
            const fileContent = '[' + row.rows.map((row) => JSON.stringify(row)).join('\n,') + ']';
            const filename = "data"
            return new NextResponse(fileContent, {
                headers: {
                    'Content-Type': 'text/plain',
                    'Content-Disposition': `attachment; filename="${filename}.txt"`,
                },
            });
        }
        return NextResponse.json({ Data: row }, { status: 200 })
    }
    return NextResponse.json({ request }, { status: 200 })
}


export async function POST(request: Request) {
    const formData = await request.json()
    const id = formData['id']
    const result = {
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
    const res = await sql`SELECT * FROM Post Where id = ${id}`
    if (res.rowCount == 1) {
        // result = res.rows[0] as {
        //     id: string;
        //     idea: string;
        //     audience: string;
        //     point: string;
        //     brief: string;
        //     review: string;
        //     priority: string;
        //     priority_status: string;
        //     budget: string;
        //     budget_status: string;
        //     consequence: string;
        //     consequence_status: string;
        //     competition: string;
        //     competition_status: string;
        //     differ: string;
        //     differ_status: string;
        //     marketing: string;
        //     marketing_status: string;
        // };
        return NextResponse.json({ Data: res.rows[0] }, { status: 200 })
    }
    return NextResponse.json({ Data: result }, { status: 200 })
}