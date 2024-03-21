import { NextResponse } from 'next/server';

export async function DELETE(req, context) {
    try {
        const { id } = context.params;
        console.log(id);
        if (!id) {
            return NextResponse.json({error: "No game id provided" }, { status: 400 });
        }
        console.log(id)
        const res = await deleteGameById(id)
        if (res.ok) {
            return NextResponse.json({result: "Game deleted successfully" }, { status: 200 });
        } else {
            return NextResponse.json({error: "Could not delete" }, { status: 500 });
        }
    } catch (err) {
        return NextResponse.json({ error: 'failed to delete game in api route' }, { status: 500 })
    }
}

async function deleteGameById(id) {
    console.log('deletegamebyid', id)
    const res = await fetch(`${process.env.API_URL}/games/${id}`, {
        method: "DELETE",
    });
    return res;
}