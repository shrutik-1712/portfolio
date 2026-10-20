import { PageTitle, Arrow, OutLink } from '../components/Common';
import { date } from '../lib';
import learning from '../data/learning.json';

export default function Learning() {
 return <div className="page learning-page">
  <PageTitle title="Learning" quiet/>
  <div className="learning-notebooks">
   {learning.map(subject => {
    const notes = (subject.notes || []).filter(note => !note.sample && !note.draft);
    return <section className={`learning-notebook${notes.length ? '' : ' learning-notebook--empty'}`} id={subject.slug} key={subject.id} aria-labelledby={`title-${subject.id}`}>
     <header><h2 id={`title-${subject.id}`}>{subject.title}</h2><p>{subject.summary}</p></header>
     {notes.length > 0 && <div className="notebook-posts">
      {notes.map(note => <details className="notebook-post" key={note.id}>
       <summary><span>{note.title || 'A learning note'}</span></summary>
       <article aria-label={note.title || 'Learning note'}>
        <div className="log-meta"><span>Shrutik</span>{date(note.date) && <time dateTime={note.date}>{date(note.date)}</time>}</div>
        {note.feeling && <p className="note-feeling">Feeling: {note.feeling}</p>}
        {note.body?.split(/\n\n+/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        {note.links?.map(link => <OutLink key={link.url} href={link.url} className="text-link">{link.label}<Arrow size={15}/></OutLink>)}
       </article>
      </details>)}
     </div>}
    </section>;
   })}
  </div>
 </div>;
}
