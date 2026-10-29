const P: Array<[string, string]> = [
  ['Натяжные потолки', 'работаем в паре'],
  ['ГКЛ и реечные', 'закладные под свет'],
  ['Штукатурка и покраска', 'под чистовую'],
  ['Плиточники', 'выводы под сантехнику'],
  ['Мебельщики', 'подсветка и розетки'],
  ['Сантехника', 'проверенный мастер'],
];

export default function Partners() {
  return (
    <section className="section" id="partnery">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">05 / бригада</div>
          <h2 className="shead__title reveal">С кем работаю рядом</h2>
          <p className="shead__note reveal">
            Электрика редко живёт отдельно от ремонта: закладные нужны до штукатурки, свет — до
            потолка. Поэтому работаю с теми, кого знаю годами.
          </p>
        </div>
        <div className="partners reveal">
          {P.map(([b, s]) => (
            <div key={b}>
              <b>{b}</b>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <p className="body-s" style={{ marginTop: 20 }}>
          Смысл простой: вам не нужно искать толковых отделочников, плиточников и сантехника по
          объявлениям. Я называю людей, чьи работы видел не один раз, и мы уже работали вместе на
          объектах.
        </p>
      </div>
    </section>
  );
}
