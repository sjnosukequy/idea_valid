import { NextResponse } from 'next/server'
// import { db } from '../../../database/sql'
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
    return NextResponse.json({ Nice: request }, { status: 200 })
}


export async function POST(request: Request) {
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

    if (id && idea && audience && point && brief && review && priority &&
        priority_status && budget && budget_status && consequence &&
        consequence_status && competition && competition_status && differ &&
        differ_status && marketing && marketing_status) {
        // console.log(`UPDATE Post SET idea = '${idea}', audience = '${audience}', point = '${point}', 
        //     brief = '${brief}', review = '${review}', priority = '${priority}', priority_status = '${priority_status}',
        //     budget = '${budget}', budget_status = '${budget_status}', consequence = '${consequence}',
        //     consequence_status = '${consequence_status}', competition = '${competition}', competition_status = '${competition_status}', 
        //     differ = '${differ}', differ_status = '${differ_status}', marketing = '${marketing}', marketing_status = '${marketing_status}' WHERE id = '${id.toLowerCase()}' `)

        const addQuerry = await sql`UPDATE Post SET idea = ${idea}, audience = ${audience}, point = ${point}, 
            brief = ${brief}, review = ${review}, priority = ${priority}, priority_status = ${priority_status},
            budget = ${budget}, budget_status = ${budget_status}, consequence = ${consequence},
            consequence_status = ${consequence_status}, competition = ${competition}, competition_status = ${competition_status}, 
            differ = ${differ}, differ_status = ${differ_status}, marketing = ${marketing}, marketing_status = ${marketing_status} WHERE id = ${id.toLowerCase()} `

        return NextResponse.json({ Data: addQuerry }, { status: 200 })
    }
    return NextResponse.json({ Data: null }, { status: 204 })
}