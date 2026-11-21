# SICOE INTELLIGENCE – video promocional (Remotion)

Video de prueba de 31 s (1920×1080, 30 fps) en español.

| Escena | Frames | Contenido |
|---|---|---|
| Hook | 0–105 | "¿Y si pudieras ver el futuro de tu negocio?" |
| Logo | 105 | Revelado de marca SICOE INTELLIGENCE |
| Pronóstico | 180 | Gráfica real vs. pronóstico IA con banda de confianza |
| Riesgo | 180 | Ranking de clientes en riesgo |
| Frecuencia | 150 | Línea de tiempo de compras y próxima compra esperada |
| IA | 180 | Asistente que recomienda acciones |
| CTA | 120 | "Decide con datos" |

## Uso
```bash
cd video
npm install
npm run dev       # Remotion Studio (editor con línea de tiempo)
npm run render    # genera out/sicoe-intelligence.mp4
```
En un entorno sin Chrome descargable: `REMOTION_BROWSER_EXECUTABLE=/ruta/a/chrome npm run render`.

## Audio
`public/audio/` trae audios provisionales (ffmpeg). Para reemplazarlos por voz, efectos y música de ElevenLabs:
```bash
ELEVENLABS_API_KEY=xxxx npm run audio          # todo
ELEVENLABS_API_KEY=xxxx node scripts/generate-audio.mjs vo   # solo voz
```
Los tiempos de cada audio están en `src/SicoePromo.tsx` (`VO` y `SFX`); los textos en `scripts/generate-audio.mjs`.
La duración de cada escena y el color de marca están en `src/theme.ts`.
