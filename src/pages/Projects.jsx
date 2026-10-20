import { useState } from 'react';
import { Empty, PageTitle, ProjectCard, Resume } from '../components/Common';
import projects from '../data/projects.json';

export default function Projects() {
 const [year,setYear]=useState('All');
 const [kind,setKind]=useState('All');
 const [tag,setTag]=useState('All');
 const matches=projects.filter(project=>(year==='All'||String(project.year)===year)&&(kind==='All'||project.kind===kind)&&(tag==='All'||project.tags.includes(tag)));
 const clear=()=>{setYear('All');setKind('All');setTag('All');};
 return <div className="page projects-page">
  <PageTitle title="Projects" quiet aside={<Resume/>}/>
  <section className="project-archive" aria-label="Project archive">
   <div className="filter-bar">
    <div className="filter-selects">
     <label>Year<select value={year} onChange={e=>setYear(e.target.value)}><option>All</option>{[...new Set(projects.map(project=>project.year).filter(Boolean))].sort((a,b)=>b-a).map(value=><option key={value}>{value}</option>)}</select></label>
     <label>Type<select value={kind} onChange={e=>setKind(e.target.value)}><option>All</option>{[...new Set(projects.map(project=>project.kind))].map(value=><option key={value}>{value}</option>)}</select></label>
     <label>Tag<select value={tag} onChange={e=>setTag(e.target.value)}><option>All</option>{[...new Set(projects.flatMap(project=>project.tags))].map(value=><option key={value}>{value}</option>)}</select></label>
    </div>
    <span aria-live="polite">{matches.length} {matches.length===1?'project':'projects'}</span>
   </div>
   {matches.length?<div className="project-grid">{matches.map(project=><ProjectCard key={project.id} project={project}/>)}</div>:<Empty title="Nothing in this little intersection.">Try another combination, or <button className="inline-button" onClick={clear}>clear the filters</button>.</Empty>}
  </section>
 </div>;
}
