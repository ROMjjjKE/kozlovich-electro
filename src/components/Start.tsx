const STEPS: Array<[string, string, string]> = [
  ['01', 'Звонок', 'Расскажите объект и задачу. Спрошу про щит, нагрузку и стены — скажу, что понадобится.'],
  ['02', 'Осмотр', 'Приезжаю, смотрю по месту: где идёт кабель, что можно оставить, что менять. Предлагаю схему и материалы.'],
  ['03', 'Монтаж', 'Работаю аккуратно и без простоев, затем проверяю линии и подписываю щит.'],
];

export default function Start() {
  return (
    <section className="section" id="start">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">06 / начало</div>
          <h2 className="shead__title reveal">Как начинается работа</h2>
          <p className="shead__note reveal">Три шага, и никаких «приедем, посмотрим, потом решим».</p>
        </div>
        <div className="start">
          {STEPS.map(([n, t, d]) => (
            <div className="reveal" key={n}>
              <b>{n}</b>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
