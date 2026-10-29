const PHONE = '+375 44 551-83-11';
const TEL = 'tel:+375445518311';

const CARD: Array<[string, string]> = [
  ['Образование', 'три профильных высших: энергетика и IT'],
  ['Опыт', 'главный инженер: электростанции, серверные Белтелеком'],
  ['Допуски', 'все группы допусков'],
  ['География', 'Минск и Минская область, все районы'],
  ['Формат', 'ИП, работаю в паре с коллегой, без посредников'],
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <div className="hero__plate micro">ИП Козлович С. В. · инженер-энергетик · Минск</div>
            <h1>Электрику считают, а не тянут на глаз</h1>
            <p className="lead hero__lead">
              Электромонтаж любой сложности в Минске и области: квартиры, дома, серверные, умный дом.
              Приезжает тот, кто делает, — не менеджер, который продаёт.
            </p>
            <div className="hero__cta">
              <a className="btn" href={TEL}>{PHONE}</a>
              <a className="link-pe" href="#intervyu">Восемь вопросов мастеру</a>
            </div>
            <p className="hero__hint">
              Лучше звоните — на объекте я редко, а по телефону детальнее: спрошу про щит, нагрузку и
              стены. В мессенджерах тоже отвечаю.
            </p>
          </div>

          <div>
            <div className="card">
              <dl>
                {CARD.map(([k, v]) => (
                  <div className="card__row" key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="card__cap">
                Аккуратность, качество и совестное отношение — не лозунг, а причина, по которой
                работаю в основном по рекомендациям.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
