/* const puppeteer = require('puppeteer');

async function getInstagramMediaLink(postURL, username, password) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle0' });
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  await page.goto(postURL, { waitUntil: 'networkidle0' });

  const mediaElement = await page.$('article img, article video');
  if (mediaElement) {
    const mediaSrc = await page.evaluate(element => element.getAttribute('src'), mediaElement);
    if (mediaSrc) {
      await browser.close();
      return mediaSrc;
    }
  }

  await browser.close();
  return null;
}

async function getInstagramStoryMediaLink(storyURL, username, password) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle0' });
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle0' });

  const storyButtonSelector = 'div[role="button"][tabindex="0"]';
  await page.waitForSelector(storyButtonSelector);
  await page.click(storyButtonSelector);
  await page.waitForTimeout(2000);

  await page.goto(storyURL, { waitUntil: 'networkidle0' });

  const storyItems = await page.$$('video > source[src], img[src]'); // Hikaye öğelerini seçiyoruz

  if (storyItems.length > 0) {
    const mediaSrc = await page.evaluate(element => element.src, storyItems[0]);

    await browser.close();

    return mediaSrc;
  }

  await browser.close();
  return null;
}

const postURL = 'https://www.instagram.com/reel/CtzXefZA-cx/?utm_source=ig_web_button_share_sheet&igshid=MzRlODBiNWFlZA==';
const storyURL = 'https://www.instagram.com/stories/ashreyiz/3130673013863422579/';
const username = 'atalayio';
const password = '1903Bjk1903.';

Promise.all([getInstagramMediaLink(postURL, username, password), getInstagramStoryMediaLink(storyURL, username, password)])
  .then(([postMediaLink, storyMediaLink]) => {
    if (postMediaLink) {
      console.log('Gönderi Medya Bağlantısı:', postMediaLink);
    } else {
      console.log('Gönderi medya bağlantısı bulunamadı.');
    }

    if (storyMediaLink) {
      console.log('Hikaye Medya Bağlantısı:', storyMediaLink);
    } else {
      console.log('Hikaye medya bağlantısı bulunamadı.');
    }
  })
  .catch(error => {
    console.error('Hata oluştu:', error);
  });

*/

const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.get('/instagram-media', async (req, res) => {
  const { postURL } = req.query;

  try {
    const mediaLink = await getInstagramMediaLink(postURL);
    if (mediaLink) {
      res.json({ mediaLink });
    } else {
      res.status(404).json({ error: 'Medya bağlantısı bulunamadı.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Hata oluştu.' });
  }
});

async function getInstagramMediaLink(postURL) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(postURL, { waitUntil: 'networkidle0' });

  const mediaElement = await page.$('article img, article video');
  if (mediaElement) {
    const mediaSrc = await page.evaluate(element => element.getAttribute('src'), mediaElement);
    if (mediaSrc) {
      await browser.close();
      return mediaSrc;
    }
  }

  await browser.close();
  return null;
}

app.listen(5000, () => {
  console.log('Server started on port 5000');
});

