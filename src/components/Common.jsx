import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X, FileDown } from 'lucide-react';
import { safeUrl, safeImage, date } from '../lib';
import site from '../data/site.json';

export function Arrow({size=19}) { return <ArrowUpRight size={size} aria-hidden="true"/>; }
export function OutLink({href,children,className,...props}) {
 const url=safeUrl(href); if(!url) return null;
 return url.startsWith('/') ? <Link to={url} className={className} {...props}>{children}</Link> : <a href={url} target="_blank" rel="noopener noreferrer" className={className} {...props}>{children}</a>;
}
export function Media({src,alt,className='',eager=false}) {
 const [failed,setFailed]=useState(false); useEffect(()=>setFailed(false),[src]);
 return safeImage(src)&&!failed ? <img className={className} src={safeImage(src)} alt={alt} loading={eager?'eager':'lazy'} decoding="async" onError={()=>setFailed(true)}/> : <div className={`media-fallback ${className}`} role="img" aria-label={alt}>Image to come</div>;
}
export function Sample({children='Sample draft'}) { return <span className="sample">{children}</span>; }
export function Meta({post}) { return <div className="post-meta"><span>{post.author || 'Shrutik'}</span><span>{post.type==='x'?'X article':'Original blog'}</span><span>{date(post.createdAt)?`${post.sample?'Sample created':'Created'} ${date(post.createdAt)}`:'Date to come'}</span>{date(post.publishedAt)&&<span>Published {date(post.publishedAt)}</span>}</div>; }
export function PageTitle({title,children,aside,quiet=false}) {
 if(quiet) return <><h1 className="sr-only">{title}</h1>{aside&&<div className="page-tools">{aside}</div>}</>;
 return <div className="page-heading"><div><h1>{title}</h1>{children&&<p>{children}</p>}</div>{aside}</div>;
}
export function Empty({title,children}) { return <div className="empty"><h3>{title}</h3><p>{children}</p></div>; }
export function Dialog({title,children,onClose,className=''}) {
 const ref=useRef(null);
 const titleId=useId();
 useEffect(()=>{
  const dialog=ref.current;
  const previous=document.activeElement;
  const previousOverflow=document.body.style.overflow;
  if(!dialog.open) dialog.showModal();
  document.body.style.overflow='hidden';
  return()=>{
   // close() queues a native close event. Listening to that event here would
   // dismiss the second mount during StrictMode's setup/cleanup replay.
   dialog.close();
   document.body.style.overflow=previousOverflow;
   if(previous?.isConnected) previous.focus();
  };
 },[]);
 return <dialog ref={ref} className={`dialog ${className}`} aria-labelledby={titleId} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{
  if(e.target!==e.currentTarget)return;
  const rect=e.currentTarget.getBoundingClientRect();
  if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)onClose();
 }}><div className="dialog-head"><h2 id={titleId}>{title}</h2><button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={21}/></button></div>{children}</dialog>;
}
export function Resume() {
 const [available,setAvailable]=useState(false);
 useEffect(()=>{const url=safeUrl(site.resumeUrl);if(!url)return; if(!url.startsWith('/')){setAvailable(true);return;} let active=true;fetch(url,{method:'HEAD'}).then(r=>{if(active)setAvailable(r.ok && r.headers.get('content-type')?.includes('application/pdf'));}).catch(()=>{});return()=>{active=false;};},[]);
 return available?<a className="text-link resume" href={safeUrl(site.resumeUrl)} target="_blank" rel="noopener noreferrer"><FileDown size={18}/>The boring official document<Arrow/></a>:<span className="muted resume"><FileDown size={18}/>Résumé to come</span>;
}
export function ProjectCard({project}) {
 return <article className="project-card">
  <Link to={`/projects/${project.slug}`} className={`project-image${project.coverFit==='contain'?' project-image--logo':''}`}>
   <Media src={project.cover} alt={project.coverAlt || `${project.title} project preview`}/><span className="image-link"><Arrow/></span>
  </Link>
  <div className="card-meta"><span>{project.kind}</span><span>{project.completedLabel || project.year || 'Year to come'} · {project.status}</span></div>
  <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p>
  {project.sample&&<Sample>Demo project</Sample>}
  <div className="project-links"><Link to={`/projects/${project.slug}`} className="text-link">View project <Arrow size={16}/></Link><OutLink href={project.demoUrl} className="text-link">Live site <Arrow size={16}/></OutLink><OutLink href={project.repoUrl} className="text-link">GitHub <Arrow size={16}/></OutLink></div>
 </article>;
}
export function PostCard({post}) {return <article className="post-card"><Link to={`/blog/${post.slug}`} className="post-image"><Media src={post.cover} alt={`${post.title} cover artwork`}/><span className="image-link"><Arrow/></span></Link><div>{post.sample&&<Sample/>}<h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Meta post={post}/>{post.type==='x'&&<OutLink href={post.xUrl} className="text-link">Read on X <Arrow/></OutLink>}</div></article>;}
