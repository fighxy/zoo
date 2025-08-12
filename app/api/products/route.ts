import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'asc' },
    });
    return Response.json(products);
  } catch {
    return new Response('Failed to fetch products', { status: 500 });
  }
}