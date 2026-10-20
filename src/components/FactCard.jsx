import { useState } from 'react';
import { motion } from 'motion/react';
import { Shuffle } from 'lucide-react';
import { Arrow, OutLink } from './Common';

export default function FactCard({ facts }) {
 const [index, setIndex] = useState(0);
 const fact = facts[index];

 return <article className="fact-card panel" id="ai-fact">
  <h2>A little AI trivia.</h2>
  {fact ? <>
   <div className="fact-text-stack">
    <motion.p key={fact.id} initial={{opacity:.5}} animate={{opacity:1}} transition={{duration:.2}} aria-live="polite" aria-atomic="true">{fact.text}</motion.p>
    {/* Overlapping invisible copies reserve the tallest wrapped text at any width. */}
    <div className="fact-size-reserve" aria-hidden="true" inert>
     {facts.map(item => <p key={item.id}>{item.text}</p>)}
    </div>
   </div>
   <div className="fact-actions">
    <div className="fact-source-stack">
     <OutLink href={fact.sourceUrl} className="fact-source">{fact.sourceTitle} <Arrow size={15}/></OutLink>
     <div className="fact-size-reserve" aria-hidden="true" inert>
      {facts.map(item => <span className="fact-source" key={item.id}>{item.sourceTitle} <Arrow size={15}/></span>)}
     </div>
    </div>
    <button onClick={() => setIndex(value => (value + 1) % facts.length)}><Shuffle size={17}/> Another fact</button>
   </div>
  </> : <p>A new rabbit hole is on its way.</p>}
 </article>;
}
