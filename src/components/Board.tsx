import { useEffect, useRef, useState } from 'react';

const MODULES = [
  ['Вводной автомат', 'номинал — под вашу нагрузку, а не «на глаз»'],
  ['Реле напряжения', 'отгорел ноль на линии — дом отключится, а не сгорит'],
  ['УЗО 30 мА', 'утечка на группах: стиральная, кухня, розетки'],
  ['Групповые автоматы', 'свет, розетки, кухня, бойлер — отдельными линиями'],
  ['Ванная и улица', 'мокрые зоны — на более чувствительной защите'],
  ['Земля и маркировка', 'каждая линия подписана, щит закрыт'],
];

export default function Board() {
  const [pin, setPin] = useState(false);
  const [shown, setShown] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 980px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!desktop.matches || calm.matches) return;

    let killed = false;
    let cleanup: (() => void) | null = null;
    let timer: number | undefined;

    const begin = () =>
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (killed || !stageRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        setPin(true);

        requestAnimationFrame(() => requestAnimationFrame(() => {
          const stage = stageRef.current;
          if (killed || !stage) return;
          const trigger = ScrollTrigger.create({
            trigger: stage,
            start: 'top top',
            end: () => '+=' + Math.round(window.innerHeight * 1.9),
            pin: true,
            scrub: 0.45,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const n = Math.min(MODULES.length, Math.floor(self.progress * (MODULES.length + 1)));
              setShown((prev) => (prev === n ? prev : n));
            },
          });
          ScrollTrigger.refresh();
          cleanup = () => trigger.kill();
        }));
      });

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        timer = window.setTimeout(begin, 80);
      }
    }, { rootMargin: '320px 0px' });
    if (stageRef.current) io.observe(stageRef.current);

    return () => {
      killed = true;
      io.disconnect();
      if (timer) clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section className={`section board ${pin ? 'board--pin' : 'board--manual'}`} id="schit">
      <div className="wrap board__head">
        <div className="cols shead">
          <div className="shead__num micro">03 / щит</div>
          <h2 className="shead__title reveal">Что должно быть в щите</h2>
          <p className="shead__note reveal">
            Не украшение и не «побольше автоматов». Прокрутите: соберём щит по модулям и разберём,
            зачем каждый.
          </p>
        </div>
      </div>

      <div className="board__stage" ref={stageRef}>
        <div className="wrap board__inner">
          <div className="box">
            <div className="box__top">
              <b>Квартирный щит</b>
              <span>сборка по нагрузке и группам</span>
            </div>
            <div className="rail">
              {MODULES.map(([t, d], i) => (
                <div className={`mod ${i < shown || !pin ? 'in' : ''}`} key={t}>
                  <div className="mod__box" aria-hidden="true" />
                  <div className="mod__cap">
                    <span className="mod__n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="mod__t">{t}</span>
                    <span className="mod__d">{d}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="board__foot">
              <p>
                Считаю нагрузку, раскладываю группы и оставляю запас: щит должен быть понятен вам, а
                не только электрику с тестером.
              </p>
              <span className="board__count" aria-hidden={!pin}>{Math.min(shown, MODULES.length)}/6</span>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <p className="board__note">
          Соберу новый щит или переберу существующий: заменю «жучки», добавлю УЗО и реле напряжения,
          подпишу линии. Если в доме старая алюминиевая проводка — скажу честно, что можно оставить, а
          что менять.
        </p>
      </div>
    </section>
  );
}
