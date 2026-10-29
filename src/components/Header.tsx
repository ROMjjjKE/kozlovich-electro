import { useEffect, useRef } from 'react';

const PHONE = '+375 44 551-83-11';
const TEL = 'tel:+375445518311';

export default function Header() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <a className="hdr__brand" href="#top" aria-label="Козлович, электромонтаж, в начало страницы">
          <span className="hdr__name">Козлович</span>
          <span className="hdr__city">электромонтаж · Минск</span>
        </a>
        <nav className="hdr__nav" aria-label="Разделы">
          <a href="#raboty">Работы</a>
          <a href="#schit">Щит</a>
          <a href="#intervyu">Интервью</a>
          <a href="#zayavka">Позвать</a>
        </nav>
        <a className="hdr__tel" href={TEL}>{PHONE}</a>
      </div>
      <span className="hdr__bar" ref={bar} aria-hidden="true" />
    </header>
  );
}
