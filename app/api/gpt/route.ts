import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ Nice: 'Hello' }, { status: 200 })
}
async function interact(request: object, user: string) {
  const headers = new Headers();
  headers.append('Authorization', process.env.NEXT_PUBLIC_API_KEY || '');
  headers.append('Content-Type', 'application/json');
  headers.append('versionID', 'production');

  const data = await fetch(`https://general-runtime.voiceflow.com/state/user/${encodeURI(user)}/interact`, {
    headers,
    method: "POST",
    body: JSON.stringify({ request })
  })
  return data.json()
}


export async function POST(request: Request) {
  const data = await request.json();
  // console.log(data)
  const postRes = await interact({
    "type": 'text',
    "payload": JSON.stringify({
      "idea": data['idea'],
      "customer": data['audience']
    }),
}, data['user']);
// console.log(postRes)
  return NextResponse.json({ postRes }, { status: 200 })
}