const SitemapGenerator = require('sitemap-generator');

// Yeh URL wahi hai jaha tu chahata hai sitemap banega
const generator = SitemapGenerator('https://shopkar-pvrm.onrender.com/', {
  stripQuerystring: false,
  filepath: './sitemap.xml', // output file
});

// Jab complete ho jaye
generator.on('done', () => {
  console.log('✅ Sitemap generated successfully!');
});

// Start generation
generator.start();
