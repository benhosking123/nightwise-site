export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  category: string
  readingTime: string
  excerpt: string
}

export const posts: BlogPost[] = [
  {
    slug: 'why-your-group-chat-cant-plan-a-night-out',
    title: "Why Your Group Chat Can't Plan a Night Out",
    date: '2026-04-20',
    author: 'NOX',
    category: 'Nightlife',
    readingTime: '4 min read',
    excerpt: '47 messages. 3 venue suggestions. Zero decisions. Sound familiar?',
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}
