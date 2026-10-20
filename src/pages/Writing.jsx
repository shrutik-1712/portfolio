import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import posts from '../data/posts.json';
import { Arrow, Empty, Media, Meta, OutLink, PageTitle, PostCard } from '../components/Common';
import { safeUrl, date, isPublicBlog } from '../lib';

const markdownFiles = import.meta.glob('../content/blogs/*.md', {query:'?raw', import:'default', eager:true});

export default function Writing() {
 const blogs = posts.filter(isPublicBlog);
 return <div className="page writing-page">
  <PageTitle title="Blog" quiet/>
  <OutLink href="https://x.com/DawaneShrutik/articles" className="text-link writing-x-link">I write on X too <Arrow/></OutLink>
  {blogs.length > 0 && <div className="posts-list">{blogs.map(post => <PostCard key={post.id} post={post}/>)}</div>}
 </div>;
}

export function Article() {
 const {slug} = useParams();
 const post = posts.find(item => isPublicBlog(item) && item.slug === slug);
 const markdown = post && markdownFiles[`../content/blogs/${post.markdownFile}`];
 if (!post) return <div className="page"><PageTitle title="Article not found.">There is no article at this address.</PageTitle><Link className="button" to="/blog">Back to writing <Arrow/></Link></div>;
 return <article className="page article-page">
  <Link to="/blog" className="back-link"><ArrowLeft size={17}/> All writing</Link>
  <header className="article-heading">
   <h1>{post.title}</h1><p>{post.excerpt}</p><Meta post={post}/>
   {post.updatedAt && <span className="small-label">Updated {date(post.updatedAt)}</span>}
   {markdown && <span className="reading-time">{Math.max(1, Math.ceil(markdown.split(/\s+/).length / 200))} min read</span>}
  </header>
  <Media className="article-cover" src={post.cover} alt={`${post.title} cover artwork`} eager/>
  {markdown ? <div className="prose"><ReactMarkdown skipHtml components={{
   a: ({href, children}) => {
    const url = safeUrl(href);
    return url ? <OutLink href={url}>{children}</OutLink> : <span>{children}</span>;
   },
   img: ({src, alt}) => <Media src={src} alt={alt || 'Article illustration'}/>
  }}>{markdown}</ReactMarkdown></div> : <Empty title="This article is unavailable.">Please check back later.</Empty>}
  <div className="detail-end"><Link className="text-link" to="/blog">Back to writing <Arrow/></Link></div>
 </article>;
}
