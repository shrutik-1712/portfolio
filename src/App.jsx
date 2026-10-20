import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Home from './pages/Home';
import Learning from './pages/Learning';
import Projects from './pages/Projects';
import Writing, { Article } from './pages/Writing';
import Project from './pages/Project';
import About from './pages/About';
import Contact from './pages/Contact';
import site from './data/site.json';
import projects from './data/projects.json';
import posts from './data/posts.json';
import { isPublicBlog } from './lib';

function LegacyArticle() {
 const {slug}=useParams();
 return <Navigate to={`/blog/${slug}`} replace/>;
}

function RouteEffects() {
 const {pathname,hash}=useLocation();
 const first=useRef(true);
 useEffect(()=>{
  const project=projects.find(item=>pathname===`/projects/${item.slug}`);
  const post=posts.find(item=>isPublicBlog(item)&&pathname===`/blog/${item.slug}`);
  const label=project?.title||post?.title||site.nav.find(item=>item.path===pathname)?.label||'Page not found';
  document.title=pathname==='/'?site.title:`${label} — Shrutik`;
  const description=project?.summary||post?.excerpt||site.description;
  document.querySelector('meta[name="description"]')?.setAttribute('content',description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content',document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content',description);
  if(hash) {
   let id=hash.slice(1);
   try { id=decodeURIComponent(id); } catch { /* Keep malformed hashes harmless. */ }
   requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView());
  } else window.scrollTo(0,0);
  if(!first.current)document.querySelector('main')?.focus({preventScroll:true});
  first.current=false;
 },[pathname,hash]);
 return null;
}

export default function App() {
 const [menu,setMenu]=useState(false);
 const location=useLocation();
 const navigate=useNavigate();
 useEffect(()=>{
  const key=event=>{if(event.key==='Escape')setMenu(false);};
  document.addEventListener('keydown',key);
  return()=>document.removeEventListener('keydown',key);
 },[]);
 useEffect(()=>setMenu(false),[location]);
 function surprise() {
  const pool=[...projects.map(item=>`/projects/${item.slug}`),...posts.filter(isPublicBlog).map(item=>`/blog/${item.slug}`),'/#ai-fact'].filter(path=>path!==location.pathname);
  navigate(pool[Math.floor(Math.random()*pool.length)]);
 }
 return <>
  <a className="skip-link" href="#main">Skip to content</a>
  <header className="site-header">
   <Link to="/" className="brand" aria-label="Shrutik home">shrutik<span className="brand-star" aria-hidden="true">.</span></Link>
   <nav aria-label="Main navigation" className="desktop-nav">{site.nav.map(item=><NavLink key={item.path} to={item.path} end={item.path==='/'}>{item.label}</NavLink>)}</nav>
   <div className="header-tools"><button className="icon-button mobile-menu-button" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="mobile-nav" onClick={()=>setMenu(value=>!value)}>{menu?<X/>:<Menu/>}</button></div>
   {menu&&<nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{site.nav.map(item=><NavLink key={item.path} to={item.path} end={item.path==='/'}>{item.label}</NavLink>)}</nav>}
  </header>
  <RouteEffects/>
  <main id="main" tabIndex={-1}><Routes>
   <Route path="/" element={<Home surprise={surprise}/>}/>
   <Route path="/learning" element={<Learning/>}/>
   <Route path="/projects" element={<Projects/>}/>
   <Route path="/projects/:slug" element={<Project/>}/>
   <Route path="/blog" element={<Writing/>}/>
   <Route path="/blog/:slug" element={<Article/>}/>
   <Route path="/writing" element={<Navigate to="/blog" replace/>}/>
   <Route path="/writing/:slug" element={<LegacyArticle/>}/>
   <Route path="/about" element={<About/>}/>
   <Route path="/contact" element={<Contact/>}/>
   <Route path="*" element={<div className="not-found"><span className="big-404">404</span><h1>A little off the map.</h1><p>This page wandered off. There are still plenty of good places to go.</p><Link className="button" to="/">Back to home <ArrowUpRight size={18}/></Link></div>}/>
  </Routes></main>
 </>;
}
