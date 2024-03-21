import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const result = await getGames();
        if (!result.ok) {
            return NextResponse.json({ error: 'failed to fetch games in api route' }, { status: result.status })
        }
        let games = await result.json();
        games.sort((a, b) => new Date(a.date) - new Date(b.date));
        return NextResponse.json(games, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: 'an error occurred in api route' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const result = await addGame(body);
        if (!result.ok) {
            return NextResponse.json({ error: 'failed to add game in api route' }, { status: result.status })
        }
        return NextResponse.json(await result.json(), { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: 'failed to fetch games in api route' }, { status: 500 })
    }
}


async function getGames() {
    const res = await fetch(`${process.env.API_URL}/games`, { cache: 'no-store' });
    return res;
}

async function addGame(game) {
    console.log(JSON.stringify(game));
    const res = await fetch(`${process.env.API_URL}/games`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
    });
    return res;
}