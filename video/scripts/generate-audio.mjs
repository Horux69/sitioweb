#!/usr/bin/env node
// Genera voz en off, efectos de sonido y música con ElevenLabs y los guarda en public/audio/.
// Uso:  ELEVENLABS_API_KEY=... node scripts/generate-audio.mjs [vo|sfx|music|all]
// Opcional: ELEVENLABS_VOICE_ID (voz para el locutor; por defecto "Rachel").
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error('Falta ELEVENLABS_API_KEY (no la pegues en el código ni en el chat; usa una variable de entorno).');
  process.exit(1);
}
const VOICE = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'audio');
const what = process.argv[2] || 'all';

const VO = [
  '¿Y si pudieras ver el futuro de tu negocio?',
  'Presentamos SICOE Intelligence.',
  'Pronostica tus ventas con precisión, mes a mes.',
  'Detecta a tiempo a los clientes en riesgo de irse.',
  'Entiende la frecuencia de compra de cada cliente.',
  'Y deja que la inteligencia artificial te diga qué hacer.',
  'SICOE Intelligence. Decide con datos.',
];

const SFX = [
  ['sfx-whoosh.mp3', 'Smooth cinematic whoosh transition, short, modern UI', 0.8],
  ['sfx-hit.mp3', 'Deep cinematic logo impact hit with sub bass and shimmering tail', 1.5],
  ['sfx-ping.mp3', 'Soft pleasant notification ping chime, clean digital', 1.0],
  ['sfx-riser.mp3', 'Short tension riser sweep building up, technology', 1.3],
  ['sfx-type.mp3', 'Soft keyboard typing on a computer, quiet and rhythmic', 4],
];

const MUSIC_PROMPT =
  'Modern corporate technology background music, uplifting electronic, soft pulsing synths and light percussion, ' +
  'optimistic and innovative, instrumental, no vocals, builds gently and ends cleanly';

async function post(url, body, accept = 'audio/mpeg') {
  const res = await fetch(url, {
    method: 'POST',
    headers: {'xi-api-key': KEY, 'Content-Type': 'application/json', Accept: accept},
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${(await res.text()).slice(0, 300)}`);
  return Buffer.from(await res.arrayBuffer());
}

const save = async (name, buf) => {
  await writeFile(path.join(OUT, name), buf);
  console.log('✓', name, `${(buf.length / 1024).toFixed(0)} KB`);
};
const attempt = async (name, fn) => {
  try { await save(name, await fn()); } catch (e) { console.warn('✗', name, '-', e.message); }
};

if (what === 'all' || what === 'vo') {
  for (const [i, text] of VO.entries()) {
    await attempt(`vo-${i + 1}.mp3`, () =>
      post(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`, {
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {stability: 0.5, similarity_boost: 0.8, style: 0.25, use_speaker_boost: true},
      }));
  }
}
if (what === 'all' || what === 'sfx') {
  for (const [name, text, dur] of SFX) {
    await attempt(name, () =>
      post('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128',
        {text, duration_seconds: dur, prompt_influence: 0.5}));
  }
}
if (what === 'all' || what === 'music') {
  await attempt('music.mp3', () =>
    post('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128',
      {prompt: MUSIC_PROMPT, music_length_ms: 32000}));
}
console.log('Listo. Revisa las duraciones con: for f in public/audio/vo-*.mp3; do ffprobe -v error -show_entries format=duration -of csv=p=0 $f; done');
