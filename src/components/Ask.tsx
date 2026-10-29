import { useState } from 'react';

const OBJ = ['Квартира', 'Частный дом', 'Офис или серверная', 'Другое'];
const PHONE = '+375 44 551-83-11';
const TEL = 'tel:+375445518311';
const WA = 'https://wa.me/375445518311';
const VIBER = 'viber://chat?number=%2B375445518311';

export default function Ask() {
  const [f, setF] = useState({ name: '', tel: '', obj: OBJ[0], place: '', note: '' });
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (f.name.trim().length < 2) errs.name = true;
    if (f.tel.replace(/\D/g, '').length < 9) errs.tel = true;
    setBad(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    const lines = [
      'Заявка с сайта: электромонтаж (ИП Козлович С. В.)',
      `Имя: ${f.name}`,
      `Телефон: ${f.tel}`,
      `Объект: ${f.obj}`,
      `Район / адрес: ${f.place || '—'}`,
      'Задача:',
      f.note || '—',
    ].join('\n');

    window.setTimeout(() => {
      window.open(`${WA}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
      setSending(false);
      setSent(true);
    }, 400);
  };

  return (
    <section className="ask" id="zayavka">
      <div className="wrap" style={{ paddingBlock: 'var(--sect)' }}>
        <div className="cols shead" style={{ marginBottom: 'clamp(18px, 3vw, 38px)' }}>
          <div className="shead__num micro">08 / связь</div>
          <h2 className="shead__title reveal">Позвоните или напишите</h2>
          <p className="shead__note reveal" style={{ color: 'var(--ink-2)' }}>
            Звонок быстрее: по телефону детальнее. Форма и мессенджеры — если неудобно говорить.
          </p>
        </div>

        <div className="ask__grid">
          <div>
            <div className="micro">Телефон</div>
            <a className="ask__phone" href={TEL}>{PHONE}</a>
            <div className="ask__msgr">
              <a href={WA} target="_blank" rel="noopener">WhatsApp</a>
              <a href={VIBER}>Viber</a>
            </div>
            <p className="ask__hint">
              Минск и Минская область, все районы. Работаю в паре с коллегой, без посредников.
            </p>
          </div>

          <form className="form" onSubmit={submit} noValidate>
            <div className="half">
              <div className={bad.name ? 'bad' : ''}>
                <label htmlFor="k-name">Имя</label>
                <input id="k-name" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!bad.name} />
                {bad.name && <span className="err">Как к вам обращаться</span>}
              </div>
              <div className={bad.tel ? 'bad' : ''}>
                <label htmlFor="k-tel">Телефон</label>
                <input id="k-tel" value={f.tel} onChange={(e) => set('tel', e.target.value)} inputMode="tel" autoComplete="tel" aria-invalid={!!bad.tel} />
                {bad.tel && <span className="err">Нужен номер для связи</span>}
              </div>
            </div>

            <div className="half">
              <div>
                <label htmlFor="k-obj">Объект</label>
                <select id="k-obj" value={f.obj} onChange={(e) => set('obj', e.target.value)}>
                  {OBJ.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="k-place">Район или адрес</label>
                <input id="k-place" value={f.place} onChange={(e) => set('place', e.target.value)} placeholder="Минск, Заводской район" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="k-note">Задача</label>
              <textarea id="k-note" rows={4} value={f.note} onChange={(e) => set('note', e.target.value)} placeholder={'Например: трёшка в новостройке, нужна разводка под дизайн-проект и сборка щита'} />
            </div>

            <button className="btn" type="submit" disabled={sending}>
              {sending ? 'Собираем заявку…' : 'Отправить в WhatsApp'}
            </button>

            {sent && (
              <div className="ask__ok" role="status">
                Заявка собрана и открыта в WhatsApp — осталось нажать «Отправить». Если окно не
                открылось, позвоните: <a href={TEL} style={{ borderBottom: '1px solid currentColor' }}>{PHONE}</a>.
              </div>
            )}

            <p className="ask__fine">
              Ориентир по стоимости скажу после осмотра: без проекта и без понимания, что в стенах,
              называть цифру — гадать.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
