import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4270/kozlovich-electro/', { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
const pre = await p.evaluate(() => Math.round(document.querySelector('#schit').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y - 500, behavior: 'instant' }), pre);
await new Promise(r => setTimeout(r, 1100));
const stage = await p.evaluate(() => Math.round(document.querySelector('.board__stage').getBoundingClientRect().top + window.scrollY));
await p.evaluate(y => window.scrollTo({ top: y + 1400, behavior: 'instant' }), stage);
await new Promise(r => setTimeout(r, 800));
console.log(await p.evaluate(() => {
  const r = s => { const e = document.querySelector(s); const b = e.getBoundingClientRect(); return { t: Math.round(b.top), h: Math.round(b.height), w: Math.round(b.width) }; };
  return { stage: r('.board__stage'), box: r('.box'), top: r('.box__top'), rail: r('.rail'), mod: r('.mod'), mb: r('.mod__box'), cap: r('.mod__cap'), foot: r('.board__foot') };
}));
await b.close();
