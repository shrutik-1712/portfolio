import { useCallback, useState } from 'react';
import { Arrow, Dialog, OutLink } from './Common';
import { xUrl } from '../lib';
import site from '../data/site.json';

export default function OnlyFans({ card = false }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const profile = xUrl(site.socials.x);
  return <>
    <button type="button" className={card ? 'onlyfans-card panel' : 'social-row joke-row'} onClick={() => setOpen(true)} aria-haspopup="dialog">
      {card ? <><span className="onlyfans-title">OnlyFans.</span><span className="onlyfans-caption">For the people who clicked before reading.</span><span className="onlyfans-invitation">Go on. Be curious. <Arrow size={22}/></span></> : <><span className="social-symbol">OF</span><span>OnlyFans<small>For the extremely curious.</small></span><Arrow /></>}
    </button>
    {open && <Dialog title="Plot twist." onClose={close}>
      <div className="joke-content">
        <p className="joke-punchline">Only posts.</p>
        <p>You wanted more of me? Best I can do is my X feed.</p>
        {profile ? <OutLink href={profile} className="button">Follow me on X <Arrow /></OutLink> : <p className="muted">My public X profile is coming soon.</p>}
      </div>
    </Dialog>}
  </>;
}
