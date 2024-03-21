import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const result = await getTeams()
        return NextResponse.json(result, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: 'failed to fetch teams in api route' }, { status: 500 })
    }
}

async function getTeams() {
    const res = await fetch(`${process.env.API_URL}/teams`);
    let teams = await res.json();
    return teams;
}