import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const movie = await request.json();
        // Aqui você implementaria a lógica para salvar no banco de dados
        // Por enquanto, vamos apenas simular sucesso
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const movie = await request.json();
        // Aqui você implementaria a lógica para remover do banco de dados
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
    }
} 