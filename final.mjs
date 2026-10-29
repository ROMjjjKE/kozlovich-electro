import puppeteer from 'puppeteer-core';
const URL = 'https://romjjjke.github.io/kozlovich-electro/';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.setViewport({ width: 1440, height: 900 });
await p.goto(URL, { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1000));
await p.screenshot({ path: 'screenshots/desktop-1440.png' });

const jump = async (sel, off) => {
  await p.evaluate((s, o) => { const el = document.querySelector(s); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - o, behavior: 'instant' }); }, sel, off);
  await new Promise(r => setTimeout(r, 800));
};
await jump('#raboty', 80);
await p.screenshot({ path: 'screenshots/desktop-raboty.png' });

await jump('#schit', 500);
await new Promise(r => setTimeout(r, 900));
const stage = await p.evaluate(() => Math.round(document.querySelector('.board__stage').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y + 1300, behavior: 'instant' }), stage);
await new Promise(r => setTimeout(r, 900));
console.log('board', await p.evaluate(() => ({ cls: document.querySelector('.board').className.split(' ').pop(), n: document.querySelector('.board__count').innerText })));
await p.screenshot({ path: 'screenshots/desktop-schit.png' });

await jump('#intervyu', 80);
await p.screenshot({ path: 'screenshots/desktop-intervyu.png' });
await jump('#partnery', 80);
await p.screenshot({ path: 'screenshots/desktop-partnery.png' });
await jump('#voprosy', 80);
await p.screenshot({ path: 'screenshots/desktop-voprosy.png' });
await jump('#zayavka', 70);
await p.screenshot({ path: 'screenshots/desktop-zayavka.png' });
await p.close();

const m = await b.newPage();
await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await m.goto(URL, { waitUntil: 'networkidle2' });
await m.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await m.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 1000));
await m.screenshot({ path: 'screenshots/mobile-390.png' });
const mj = async (sel, off) => {
  await m.evaluate((s, o) => { const el = document.querySelector(s); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - o, behavior: 'instant' }); }, sel, off);
  await new Promise(r => setTimeout(r, 700));
};
await mj('#schit', 60);
await m.screenshot({ path: 'screenshots/mobile-390-schit.png' });
await mj('#intervyu', 60);
await m.screenshot({ path: 'screenshots/mobile-390-intervyu.png' });
await mj('#zayavka', 60);
await m.screenshot({ path: 'screenshots/mobile-390-zayavka.png' });
await m.close();
await b.close();
console.log('shots ok, errors:', errs.slice(0, 2));
