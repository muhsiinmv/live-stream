import { NextResponse } from 'next/server';
import { sportsStore } from '@/lib/store';
import { NewsArticle } from '@/types';

export async function GET() {
  const news = sportsStore.getNews();
  return NextResponse.json({ success: true, count: news.length, news });
}

export async function POST(request: Request) {
  try {
    const body: NewsArticle = await request.json();
    if (!body.title || !body.content) {
      return NextResponse.json({ success: false, error: 'Missing title or content' }, { status: 400 });
    }

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const article: NewsArticle = {
      ...body,
      id: body.id || `news-${Date.now()}`,
      slug
    };

    const saved = sportsStore.addOrUpdateNews(article);
    return NextResponse.json({ success: true, article: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
