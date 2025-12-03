import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lê o arquivo de dados
const storiesDataPath = path.join(__dirname, '../data/stories.json');
const outputDir = path.join(__dirname, '../public/stories');

if (!fs.existsSync(storiesDataPath)) {
  console.error('❌ Arquivo data/stories.json não encontrado.');
  process.exit(1);
}

const stories = JSON.parse(fs.readFileSync(storiesDataPath, 'utf-8'));

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Template HTML AMP Base
const generateAMPHTML = (story) => {
  return `<!DOCTYPE html>
<html amp lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <title>${story.title}</title>
    <link rel="canonical" href="https://junny.com.br/stories/${story.slug}.html">
    
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
    <script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
    
    <style amp-custom>
      amp-story { font-family: 'Roboto', sans-serif; color: #fff; }
      amp-story-page { background-color: #000; }
      h1 { font-weight: bold; font-size: 1.5em; line-height: 1.2; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
      p { font-weight: normal; font-size: 1.1em; line-height: 1.5; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
      .text-wrapper {
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        padding: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .cta-button {
        background: #00E676; /* Junny Primary Green */
        color: #000;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 30px;
        font-weight: bold;
        display: inline-block;
        margin-top: 15px;
        text-transform: uppercase;
        font-size: 0.9em;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      }
    </style>
  </head>
  <body>
    <amp-story standalone
        title="${story.title}"
        publisher="${story.publisher}"
        publisher-logo-src="${story.publisherLogo}"
        poster-portrait-src="${story.posterPortrait}">
      
      ${story.slides.map(slide => `
        <amp-story-page id="${slide.id}">
          <amp-story-grid-layer template="fill">
            ${slide.media.type === 'video' ? `
              <amp-video autoplay loop width="720" height="1280" poster="${slide.media.poster || ''}" layout="responsive">
                <source src="${slide.media.url}" type="video/mp4">
              </amp-video>
            ` : `
              <amp-img src="${slide.media.url}" width="720" height="1280" layout="responsive" alt="Story Image"></amp-img>
            `}
          </amp-story-grid-layer>
          
          <amp-story-grid-layer template="vertical" class="text-wrapper">
            <div animate-in="${slide.animation || 'fade-in'}" animate-in-duration="0.5s">
              ${slide.id === 'capa' ? `<h1>${slide.text}</h1>` : `<p>${slide.text}</p>`}
              
              ${slide.cta ? `
                <div style="text-align: center; margin-top: 20px;">
                   <a href="${slide.cta.url}" class="cta-button">${slide.cta.label}</a>
                </div>
              ` : ''}
            </div>
          </amp-story-grid-layer>
          
          ${slide.cta ? `
            <amp-story-page-outlink layout="nodisplay">
              <a href="${slide.cta.url}">${slide.cta.label}</a>
            </amp-story-page-outlink>
          ` : ''}
          
        </amp-story-page>
      `).join('')}

    </amp-story>
  </body>
</html>`;
};

// Gera os arquivos
stories.forEach(story => {
  const html = generateAMPHTML(story);
  const filePath = path.join(outputDir, `${story.slug}.html`);
  fs.writeFileSync(filePath, html);
  console.log(`✅ Web Story gerado: public/stories/${story.slug}.html`);
});
