import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, CalendarDays, Check, Clock3, Copy, Flame, Flower2, Heart, MapPin, Pause, Phone, Play, Utensils, Volume2 } from 'lucide-react';
import './styles.css';
import './animations.css';

const wedding = new Date('2026-11-26T18:00:00+05:30');
const venue = 'रामलीला ग्राउंड, डी-ब्लॉक, इंद्रप्रस्थ कॉलोनी, निकट S.B.V.M. इंटरनेशनल स्कूल, लोनी, गाज़ियाबाद, उत्तर प्रदेश – 201102';
const makeoverMap = 'https://www.google.com/maps/place/Sulekha+makeover/@28.7302656,77.3326122,808m/data=!3m2!1e3!4b1!4m6!3m5!1s0x390cf9bfb2fea08f:0xc01acc67e947d3d!8m2!3d28.7302656!4d77.3326122!16s%2Fg%2F11x5cdf1g9?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D';
const content = {
  invocation: '॥ श्री गणेशाय नमः ॥', blessing: '🙏🌺 जय माँ बुंगी  देवी! 🌺🙏',
  mantra: ['वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।', 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'],
  groom: 'चि. सुयश (सोनू)', bride: 'आयु. नेहा (चिंकी)',
  invite: 'ईश्वर की असीम कृपा एवं बड़े-बुजुर्गों के शुभाशीर्वाद से हमारे परिवार में शुभ विवाह का मंगलमय अवसर आया है। इस पावन अवसर पर आप सपरिवार सादर आमंत्रित हैं। कृपया पधारकर नवदंपति को अपना स्नेह एवं आशीर्वाद प्रदान करें।',
  date: 'गुरुवार, 26 नवंबर 2026',
  groomFamily: { title: 'वर पक्ष', name: 'चि. सुयश (सोनू)', rows: [['माता', 'श्रीमती जशोदा रावत'], ['पिता', 'श्री आलम सिंह रावत'], ['दादा', 'स्वर्गीय श्री मनवर सिंह रावत'], ['दादी', 'स्वर्गीय श्रीमती भुंद्रा देवी']] },
  brideFamily: { title: 'वधू पक्ष', name: 'आयु. नेहा (चिंकी)', rows: [['माता', 'श्रीमती कमलेश चौहान'], ['पिता', 'श्री बालकिशन चौहान']] },
  familyAddress: 'ग्राम बियासी पल्ली, पट्टी बोंगी, पोस्ट ऑफिस चामसैंण, नैनीडांडा, जिला पौड़ी गढ़वाल, उत्तराखंड – 246161',
  hosts: 'समस्त रावत परिवार एवं मित्रगण',
};

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: .75, ease: [.22, 1, .36, 1] } } };
function Section({ id, className = '', children }) { const reduce = useReducedMotion(); return <motion.section id={id} className={className} variants={reveal} initial={reduce ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: .14 }}>{children}</motion.section>; }
function Divider() { return <div className="divider" aria-hidden="true"><span/><Flower2 size={19}/><span/></div>; }
function Heading({ eyebrow, children }) { return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{children}</h2><Divider /></div>; }
function Petals() { return <div className="petals" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ '--i': i, '--left': `${(i * 37 + 9) % 100}%`, '--delay': `${(i % 7) * -1.2}s`, '--duration': `${12 + (i % 5) * 2}s` }} />)}</div>; }
function SparklesLayer() { return <div className="sparkles-layer" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ '--left': `${(i * 67 + 13) % 100}%`, '--top': `${(i * 43 + 11) % 100}%`, '--delay': `${(i % 6) * -.7}s` }} />)}</div>; }
function Countdown() {
  const [now, setNow] = useState(Date.now());
  const reduceMotion = useReducedMotion();
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(timer); }, []);
  const diff = Math.max(0, wedding.getTime() - now), days = Math.floor(diff / 86400000), hours = Math.floor(diff / 3600000) % 24, mins = Math.floor(diff / 60000) % 60, secs = Math.floor(diff / 1000) % 60;
  return <div className="countdown">{[['दिन', days], ['घंटे', hours], ['मिनट', mins], ['सेकंड', secs]].map(([label, value]) => <div className="count-cell" key={label}><motion.strong key={value} initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .22 }}>{String(value).padStart(2, '0')}</motion.strong><span>{label}</span></div>)}</div>;
}
function FamilyCard({ data, side }) { const reduceMotion = useReducedMotion(); return <motion.article className="family-card" whileHover={reduceMotion ? undefined : { y: -5 }}><div className="corner top-left"/><div className="corner bottom-right"/><span className="family-icon"><Flower2 size={20}/></span><h3>{data.title}</h3><p className="family-name">{data.name}</p><Divider/><dl>{data.rows.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl><span className="side-note">{side}</span></motion.article>; }
function App() {
  const [opened, setOpened] = useState(false), [copied, setCopied] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const openInvitation = () => { setOpened(true); setTimeout(() => document.getElementById('invitation')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }), 180); };
  const copyAddress = async () => { try { await navigator.clipboard.writeText(venue); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { window.prompt('पता कॉपी करें:', venue); } };
  const toggleMusic = async () => {
    if (audioRef.current) {
      const { context, master, oscillators } = audioRef.current;
      master.gain.setTargetAtTime(0, context.currentTime, .12);
      oscillators.forEach(oscillator => oscillator.stop(context.currentTime + .5));
      audioRef.current = null;
      setMusicPlaying(false);
      window.setTimeout(() => context.close().catch(() => {}), 600);
      return;
    }
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    await context.resume();
    const master = context.createGain();
    master.gain.setValueAtTime(0, context.currentTime);
    master.gain.linearRampToValueAtTime(.025, context.currentTime + 1.8);
    master.connect(context.destination);
    const oscillators = [130.81, 164.81, 196].map((frequency, index) => {
      const oscillator = context.createOscillator();
      const voice = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index === 1 ? -5 : 3;
      voice.gain.value = index === 0 ? .42 : .24;
      oscillator.connect(voice);
      voice.connect(master);
      oscillator.start();
      return oscillator;
    });
    audioRef.current = { context, master, oscillators };
    setMusicPlaying(true);
  };
  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.oscillators.forEach(oscillator => { try { oscillator.stop(); } catch {} });
      audioRef.current.context.close().catch(() => {});
      audioRef.current = null;
    }
  }, []);
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`;
  const coupleNames = ['Suyash “Sonu” Rawat', 'Neha “Chinki” Singh Rawat'];
  const musicButton = <motion.button className="music-toggle" type="button" onClick={toggleMusic} whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={reduceMotion ? undefined : { scale: .96 }} aria-pressed={musicPlaying} aria-label={musicPlaying ? 'संगीत रोकें' : 'संगीत चलाएँ'}>{musicPlaying ? <Pause size={16}/> : <Play size={16}/>}<span>{musicPlaying ? 'संगीत रोकें' : 'संगीत चलाएँ'}</span><Volume2 className="music-volume" size={15}/></motion.button>;
  return <>
    <AnimatePresence>
      {!opened && <motion.div className="intro" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: .8 }}>
        <div className="intro-frame"/><Petals/><SparklesLayer/><motion.div className="intro-content" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .25, duration: .8 }}>
          <div className="flame-wrap"><Flame size={36}/><span/></div><span className="intro-kicker">मंगलमय शुभारम्भ</span><h1>{content.invocation}</h1><Divider/><p>{content.blessing}</p>
          <motion.button className="gold-button" onClick={openInvitation} whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={reduceMotion ? undefined : { scale: .96 }}>विवाह निमंत्रण खोलें <ArrowDown size={16}/></motion.button>
          <button className="skip" onClick={openInvitation}>सीधे निमंत्रण देखें</button>
          {musicButton}
        </motion.div><div className="temple-mark" aria-hidden="true">❧　ॐ　❧</div>
      </motion.div>}
    </AnimatePresence>
    <main className={opened ? 'site is-open' : 'site'}>
      <header className="topbar"><a className="brand" href="#top" aria-label="आरम्भ पर जाएँ"><span>स</span><i>✦</i><span>न</span></a><a href="#invitation">निमंत्रण</a><a href="#venue">स्थान</a><a href="#contact">संपर्क</a></header>
      <div id="top" className="hero"><Petals/><SparklesLayer/><div className="hero-mountains" aria-hidden="true"/><div className="hero-copy"><span className="eyebrow">॥ श्री गणेशाय नमः ॥</span><p className="blessing">{content.blessing}</p><div className="mandala" aria-hidden="true"><span>शुभ विवाह</span></div><p className="hero-small">सप्रेम सादर आमंत्रण</p><motion.div className="hero-couple" initial={reduceMotion ? false : 'hidden'} animate="visible" variants={{ visible: { transition: { staggerChildren: .28, delayChildren: .2 } } }}><motion.h1 variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: .8 } } }}>{content.groom}<em>संग</em>{content.bride}</motion.h1><div className="hero-name-english" aria-label="Suyash Sonu Rawat and Neha Chinki Singh Rawat">{coupleNames.map((name, index) => <motion.span key={name} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: .85, delay: index * .25 } } }}>{name}</motion.span>)}</div></motion.div><p className="hero-date"><CalendarDays size={17}/>{content.date}</p><a className="scroll-cue" href="#blessings"><span>आगे पढ़ें</span><ArrowDown size={16}/></a></div></div>
      <Section id="blessings" className="blessings section-pad"><Heading eyebrow="देवी माँ का आशीर्वाद">शुभारम्भ, शुभाशीष के साथ</Heading><div className="blessing-layout"><div className="devi-art" role="img" aria-label="दीप और हिमालय से प्रेरित माँ बगी देवी को समर्पित कलात्मक प्रतीक"><div className="art-halo"/><div className="art-mountain">⌃</div><div className="art-lotus">❋</div><div className="art-diya"><Flame size={43}/></div><div className="art-caption">जय माँ बगी देवी</div></div><div className="mantra-copy"><span className="eyebrow">मंगलाचरण</span><h3>{content.blessing}</h3><Divider/>{content.mantra.map(line => <p key={line}>{line}</p>)}<span className="mantra-end">॥ श्री गणेशाय नमः ॥</span></div></div></Section>
      <Section id="invitation" className="invite-section section-pad"><div className="invitation-card"><div className="card-inner"><span className="eyebrow">सपरिवार पधारने का सादर अनुरोध</span><h2>सप्रेम सादर आमंत्रण</h2><Divider/><p className="couple-name">{content.groom}</p><span className="together">संग</span><p className="couple-name bride-name">{content.bride}</p><p className="invite-copy">{content.invite}</p><div className="date-plaque"><CalendarDays size={20}/><span>{content.date}</span></div></div></div></Section>
      <Section className="families section-pad"><Heading eyebrow="दो परिवार, एक मंगल मिलन">परिवार परिचय</Heading><div className="family-grid"><FamilyCard data={content.groomFamily} side="रावत परिवार"/><FamilyCard data={content.brideFamily} side="चौहान परिवार"/></div></Section>
      <Section className="count-section section-pad"><div className="count-ornament">✦　❋　✦</div><Heading eyebrow="शुभ दिन की प्रतीक्षा">विवाह में शेष समय</Heading><Countdown/><p className="count-date">{content.date}</p><div className="count-ornament">❋</div></Section>
      <Section className="timeline-section section-pad"><Heading eyebrow="शुभ अवसर">कार्यक्रम</Heading><p className="timeline-date"><CalendarDays size={18}/>{content.date}</p><div className="timeline"><article className="event"><div className="event-icon"><Heart size={20}/></div><div><span className="eyebrow">सायं 6:00 बजे</span><h3>वर-वधू स्वागत</h3></div><Clock3 className="event-clock" size={18}/></article><article className="event"><div className="event-icon"><Utensils size={20}/></div><div><span className="eyebrow">रात्रि 8:00 बजे</span><h3>प्रीतिभोज एवं रात्रि भोज</h3></div><Clock3 className="event-clock" size={18}/></article></div></Section>
      <Section id="venue" className="venue-section section-pad"><Heading eyebrow="आपकी प्रतीक्षा में">शुभ स्थल</Heading><div className="venue-card"><div className="venue-icon"><MapPin size={26}/></div><h3>रामलीला ग्राउंड</h3><p className="venue-address">{venue}</p><div className="venue-actions"><a href={maps} className="gold-button" target="_blank" rel="noopener noreferrer"><MapPin size={17}/>Google Maps पर रास्ता देखें</a><button className="outline-button" onClick={copyAddress}>{copied ? <Check size={17}/> : <Copy size={17}/>} {copied ? 'पता कॉपी हो गया' : 'पता कॉपी करें'}</button></div><div className="map-reference"><p>अलग Google Maps स्थान</p><a href={makeoverMap} className="map-button" target="_blank" rel="noopener noreferrer"><MapPin size={17}/><span>View Sulekha Makeover on Google Maps</span></a></div></div><p className="family-address"><span>वर पक्ष का निवास</span>{content.familyAddress}</p></Section>
      <Section id="contact" className="contact-section section-pad"><div className="contact-inner"><span className="contact-flower">❋</span><Heading eyebrow="सादर निमंत्रण">अधिक जानकारी हेतु संपर्क करें</Heading><p>किसी भी जानकारी के लिए परिवार से संपर्क करें।</p><div className="contact-note"><Phone size={18}/><span>संपर्क नंबर दिए गए विवरण में उपलब्ध नहीं हैं।</span></div><p className="hosts">{content.hosts}</p></div></Section>
      <footer className="closing section-pad"><div className="closing-frame"/><div className="closing-content"><span className="eyebrow">माँ बगी देवी का आशीर्वाद</span><div className="closing-lotus">❋</div><p>{content.blessing}</p><h2>आपकी गरिमामयी उपस्थिति हमारे लिए सौभाग्य एवं हर्ष का विषय होगी।</h2><Divider/><span className="darshan">दर्शनाभिलाषी</span><p className="hosts">🙏 {content.hosts} 🙏</p><p className="closing-date">{content.date}</p><button className="gold-button" onClick={() => { document.getElementById('top')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); }}>निमंत्रण पुनः देखें <ArrowDown size={16}/></button></div><Petals/></footer>
      <div className="footer-line">स्नेह, परंपरा और शुभाशीष के साथ <span>✦</span></div>
    </main>
    {opened && musicButton}
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
