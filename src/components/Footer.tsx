export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <h3>Исполнитель</h3>
            <p>ИП Козлович С. В.<br />Инженер-энергетик<br />Минск и Минская область</p>
          </div>
          <div>
            <h3>Телефон</h3>
            <p><a href="tel:+375445518311">+375 44 551-83-11</a></p>
          </div>
          <div>
            <h3>Работы</h3>
            <p>Разводка и щиты<br />Тёплые полы, умный дом<br />Видеонаблюдение, домофон</p>
          </div>
          <div>
            <h3>Разделы</h3>
            <p>
              <a href="#raboty">Работы</a><br />
              <a href="#intervyu">Интервью</a><br />
              <a href="#zayavka">Связь</a>
            </p>
          </div>
        </div>
        <p className="ftr__legal">
          Сайт не является публичной офертой: состав работ, стоимость и сроки согласуются после
          осмотра объекта. Все группы допусков, работаю как ИП, без посредников.
        </p>
      </div>
    </footer>
  );
}
