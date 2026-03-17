import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = './public/images';

const IMAGES = [
  {
    filename: 'service-ai-visuals.png',
    prompt: 'African digital artist creating AI-generated visuals, futuristic studio with holographic screens, dark skin creative professional using floating 3D interface, warm orange and gold accents, afrofuturism aesthetic, cinematic lighting, photorealistic style, ultra detailed, professional illustration'
  },
  {
    filename: 'service-web.png',
    prompt: 'African tech entrepreneur designing website, futuristic workspace in Dakar, dark skin developer with modern style, holographic UI elements floating, warm sunset colors with neon purple accents, afrofuturist architecture, ultra modern illustration, professional design'
  },
  {
    filename: 'service-automation.png',
    prompt: 'African business owner managing AI automation, smart modern office, holographic dashboard with data analytics, dark skin professional in elegant attire, warm golden lighting, technology meets African entrepreneurship, photorealistic, cinematic quality'
  },
  {
    filename: 'service-community.png',
    prompt: 'African social media manager with modern hairstyle, managing multiple platforms on holographic screens, vibrant orange and green colors, digital engagement visualization, warm professional lighting, afrofuturism tech aesthetic, ultra detailed illustration'
  },
  {
    filename: 'service-branding.png',
    prompt: 'African graphic designer creating brand identity, luxury African brand elements floating in 3D space, gold and rich brown tones, dark skin creative professional, elegant modern studio, traditional African patterns integrated into logos, photorealistic quality'
  },
  {
    filename: 'project-keurgeek.png',
    prompt: 'African tech startup team in modern Dakar office, young entrepreneurs collaborating around holographic displays, map of Senegal with digital connections, warm natural lighting, contemporary African fashion, innovation hub atmosphere, photorealistic cinematic'
  },
  {
    filename: 'project-senestock.png',
    prompt: 'African woman entrepreneur using smart inventory app, modern boutique with digital price tags, holographic product scanner, vibrant African fabrics displayed, warm golden hour lighting, technology empowering local business, photorealistic ultra detailed'
  }
];

async function generateImages() {
  console.log('🎨 Starting image generation...\n');
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const zai = await ZAI.create();
  
  for (let i = 0; i < IMAGES.length; i++) {
    const { filename, prompt } = IMAGES[i];
    const outputPath = path.join(OUTPUT_DIR, filename);
    
    console.log(`📸 [${i + 1}/${IMAGES.length}] Generating: ${filename}`);
    console.log(`   Prompt: ${prompt.substring(0, 80)}...`);
    
    try {
      const response = await zai.images.generations.create({
        prompt: prompt,
        size: '1344x768'
      });

      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(outputPath, buffer);
      
      console.log(`   ✅ Saved: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)\n`);
    } catch (error: any) {
      console.error(`   ❌ Failed: ${error.message}\n`);
    }
  }
  
  console.log('🎉 Image generation complete!');
}

generateImages().catch(console.error);
