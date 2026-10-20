import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shuffle, Play } from 'lucide-react';
import { Arrow, Media, OutLink } from '../components/Common';
import OnlyFans from '../components/OnlyFans';
import FactCard from '../components/FactCard';
import { date, playlistId, isPublicBlog } from '../lib';
import profile from '../data/profile.json';
import facts from '../data/facts.json';
import projects from '../data/projects.json';
import posts from '../data/posts.json';
import now from '../data/now.json';

export default function Home({ surprise }) {
 const [video, setVideo] = useState(true);
 const [embedFailed, setEmbedFailed] = useState(false);
 const id = playlistId(profile.youtube?.playlistId);
 const project = projects.find(item => item.featured) || projects[0];
 const blogs = posts.filter(isPublicBlog);
 const post = blogs.find(item => item.featured) || blogs[0];
 return <div className="home">
  <section className={`bento${post ? '' : ' bento--without-writing'}`} aria-label="Shrutik’s personal dashboard">
   <section className="welcome-card panel">
    <h1>Hey, I’m<br/>Shrutik.</h1>
    <p>{profile.tagline}</p>
    <div className="welcome-actions"><Link className="button" to="/projects">Explore my projects <Arrow/></Link><button className="surprise-button" onClick={surprise}><Shuffle size={17}/> Surprise me</button></div>
   </section>
   <Link to="/about" className="portrait-card panel">
    <Media src={profile.portrait} alt={profile.portraitIsPlaceholder ? 'Portrait placeholder artwork — add a photo of Shrutik' : 'Shrutik'} eager/>
    <div className="portrait-label"><span>A human, behind the tabs.</span><Arrow/></div>
    {profile.portraitIsPlaceholder && <span className="portrait-placeholder">Portrait placeholder</span>}
   </Link>
   <article className="now-card panel">
    <h2>Less scrolling.<br/>More making.</h2>
    <div className="now-status"><span className="status-dot"/> A work in progress</div>
    <dl className="now-lines"><div><dt>Building</dt><dd>{now.building}</dd></div><div><dt>Learning</dt><dd>{now.learning}</dd></div>{now.reading && <div><dt>Reading</dt><dd>{now.reading}</dd></div>}</dl>
    <div className="panel-bottom"><span>Updated {date(now.updatedAt) || 'as life happens'}</span><Link to="/learning" aria-label="Explore learning notes"><Arrow/></Link></div>
   </article>
   {project && <article className="project-feature panel">
    <Link to={`/projects/${project.slug}`} className="feature-cover"><Media src={project.cover} alt={`${project.title} — project preview`}/></Link>
    <div className="feature-footer"><div><p className="small-label">Featured project · {project.kind}</p><h2><Link to={`/projects/${project.slug}`}>{project.title}</Link></h2></div><Link className="round-arrow" to={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`}><Arrow/></Link></div>
   </article>}
   <FactCard facts={facts}/>
   {post && <Link className="writing-teaser panel" to={`/blog/${post.slug}`}>
    <h2>{post.title}</h2><div className="teaser-meta"><span>From the notebook</span></div><p>{post.excerpt}</p><span className="text-link">Read the story <Arrow/></span>
   </Link>}
   <article className="playlist-card panel">
    <h2>The rabbit-hole queue.</h2>
    {id && video && !embedFailed ? <iframe title={profile.youtube.label} src={`https://www.youtube.com/embed/videoseries?list=${id}`} allow="encrypted-media; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onError={() => setEmbedFailed(true)}/> : <>
     <div className="record-art" aria-hidden="true"><div className="record"><div/></div><div className="record-sleeve"><Play size={24}/><span>A good<br/>rabbit hole.</span></div></div>
     <p>{embedFailed ? 'The player could not load. You can open the playlist directly on YouTube.' : id ? 'A collection of things worth watching.' : 'Still picking the first rabbit hole. A public YouTube playlist will live here.'}</p>
     {id ? <button className="text-link" onClick={() => {setEmbedFailed(false);setVideo(true);}}>{embedFailed ? 'Retry player' : 'Load playlist'} <Play size={16}/></button> : <span className="small-label">Public playlist coming later</span>}
    </>}
    {id && <OutLink href={`https://www.youtube.com/playlist?list=${id}`} className="text-link">Open on YouTube <Arrow/></OutLink>}
   </article>
   <Link className="offscreen-teaser panel" to="/about"><h2>{profile.offscreen.title}</h2><p>{profile.offscreen.intro}</p><span className="text-link">Meet the rest of me <Arrow/></span></Link>
   <OnlyFans card/>
  </section>
  <section className="home-closing"><h2>Got something in mind?</h2><Link to="/contact">Let’s talk <Arrow/></Link><span>Ideas, collaborations, or just a hello.</span></section>
 </div>;
}
