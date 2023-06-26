--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Bağlantı linki alma yöntemi:

const puppeteer = require('puppeteer');

async function getInstagramImageLink(postURL, username, password) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle0' });
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  await page.goto(postURL, { waitUntil: 'networkidle0' });

  const imageURL = await page.evaluate(() => {
    const metaTags = Array.from(document.getElementsByTagName('meta'));
    const ogImageTag = metaTags.find(tag => tag.getAttribute('property') === 'og:image');

    if (ogImageTag) {
      return ogImageTag.getAttribute('content');
    }
    return null;
  });

  await browser.close();

  return imageURL;
}

const postURL = 'https://www.instagram.com/reel/CtwgC27A0gj/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==';
const username = 'atalayio';
const password = '1903Bjk1903.';

getInstagramImageLink(postURL, username, password)
  .then(imageLink => {
    if (imageLink) {
      console.log('Görsel Bağlantısı:', imageLink);
    } else {
      console.log('Görsel bağlantısı bulunamadı.');
    }
  })
  .catch(error => {
    console.error('Hata oluştu:', error);
  });


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Lokal indirme yöntemi: 

const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const fs = require('fs');

async function downloadInstagramImage(postURL, username, password, savePath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  
  await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle0' });
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  
  await page.goto(postURL, { waitUntil: 'networkidle0' });

  
  const imageURL = await page.evaluate(() => {
    const metaTags = Array.from(document.getElementsByTagName('meta'));
    const ogImageTag = metaTags.find(tag => tag.getAttribute('property') === 'og:image');

    if (ogImageTag) {
      return ogImageTag.getAttribute('content');
    }
    return null;
  });

  
  if (imageURL) {
    const imageName = 'image.png'; 
    const imagePath = `${savePath}/${imageName}`; 

    const response = await fetch(imageURL);
    const buffer = await response.buffer();
    fs.writeFile(imagePath, buffer, () => console.log('Görsel indirildi.'));
  }

  await browser.close();
}


const postURL = 'https://www.instagram.com/p/Ctyk26DtoGi/?utm_source=ig_web_button_share_sheet&igshid=MzRlODBiNWFlZA=='; 
const username = 'atalayio'; 
const password = '1903Bjk1903.'; 
const savePath = 'C:/Users/Emin/Downloads'; 

downloadInstagramImage(postURL, username, password, savePath);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Video indirme örneği: 

const puppeteer = require('puppeteer');

async function getInstagramVideoLink(postURL) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(postURL, { waitUntil: 'networkidle0' });

  const videoElement = await page.$('video');
  if (videoElement) {
    const videoSrc = await page.evaluate(element => element.getAttribute('src'), videoElement);
    await browser.close();
    return videoSrc;
  }

  await browser.close();
  return null;
}

const postURL = 'https://www.instagram.com/reel/CtzXefZA-cx/?utm_source=ig_web_button_share_sheet&igshid=MzRlODBiNWFlZA==';

getInstagramVideoLink(postURL)
  .then(videoLink => {
    if (videoLink) {
      console.log('Video Bağlantısı:', videoLink);
    } else {
      console.log('Video bağlantısı bulunamadı.');
    }
  })
  .catch(error => {
    console.error('Hata oluştu:', error);
  });


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Hatasız çalışan kod: (Hikaye yok)

const puppeteer = require('puppeteer');

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

const postURL = 'https://www.instagram.com/reel/CtzXefZA-cx/?utm_source=ig_web_button_share_sheet&igshid=MzRlODBiNWFlZA==';

getInstagramMediaLink(postURL)
  .then(mediaLink => {
    if (mediaLink) {
      console.log('Medya Bağlantısı:', mediaLink);
    } else {
      console.log('Medya bağlantısı bulunamadı.');
    }
  })
  .catch(error => {
    console.error('Hata oluştu:', error);
  });

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
