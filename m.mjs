import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await p.goto('http://127.0.0.1:4270/kozlovich-electro/', { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
await p.evaluate(() => { const el = document.querySelector('#schit'); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + 200, behavior: 'instant' }); });
await new Promise(r => setTimeout(r, 700));
console.log(await p.evaluate(() => ({
  cls: document.querySelector('.board').className.split(' ').pop(),
  mods: document.querySelectorAll('.mod.in').length,
  cols: getComputedStyle(document.querySelector('.rail')).gridTemplateColumns,
  sw: document.documentElement.scrollWidth, boxH: Math.round(document.querySelector('.box').getBoundingClientRect().height),
})));
await p.screenshot({ path: 'shots/k-mobile-board.png' });
const p2 = await b.newPage();
await p2.setViewport({ width: 1440, height: 900 });
await p2.goto('http://127.0.0.1:4270/kozlovich-electro/', { waitUntil: 'networkidle2' });
await p2.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p2.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 600));
await p2.evaluate(() => { const el = document.querySelector('#intervyu'); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'instant' }); });
await new Promise(r => setTimeout(r, 700));
await p2.screenshot({ path: 'shots/k-interview.png' });
console.log(await p2.evaluate(() => {
  const it = document.querySelector('.qa__item').getBoundingClientRect();
  return { itemH: Math.round(it.height), cols: getComputedStyle(document.querySelector('.qa__item')).gridTemplateColumns };
}));
await b.close();
