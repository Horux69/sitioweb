#!/usr/bin/env bash
# Genera audios provisionales con ffmpeg para que el video suene aunque no haya API key.
# Se sobrescriben con `npm run audio` (ElevenLabs).
set -euo pipefail
cd "$(dirname "$0")/../public/audio"

# gen <fuente lavfi> <filtro o -> <archivo de salida>
gen() {
  local src="$1" af="$2" out="$3"
  if [ "$af" = "-" ]; then
    ffmpeg -y -loglevel error -f lavfi -i "$src" -ac 2 -ar 44100 -b:a 128k "$out"
  else
    ffmpeg -y -loglevel error -f lavfi -i "$src" -af "$af" -ac 2 -ar 44100 -b:a 128k "$out"
  fi
}

gen "anoisesrc=d=0.8:c=pink:a=0.6" "highpass=f=300,lowpass=f=4500,afade=t=in:d=0.35,afade=t=out:st=0.35:d=0.45" sfx-whoosh.mp3
gen "aevalsrc='0.9*sin(2*PI*70*t*exp(-t*2.5))*exp(-t*4)+0.25*(random(0)-0.5)*exp(-t*18)':d=1.4:s=44100" - sfx-hit.mp3
gen "aevalsrc='0.5*sin(2*PI*1320*t)*exp(-t*6)+0.25*sin(2*PI*1980*t)*exp(-t*8)':d=0.9:s=44100" - sfx-ping.mp3
gen "anoisesrc=d=1.3:c=white:a=0.5" "highpass=f=900,lowpass=f=9000,afade=t=in:d=1.2,afade=t=out:st=1.2:d=0.1" sfx-riser.mp3
gen "anoisesrc=d=4:c=white:a=0.7" "highpass=f=2500,tremolo=f=14:d=1,volume=0.6" sfx-type.mp3
gen "aevalsrc='0.12*(sin(2*PI*110*t)+sin(2*PI*164.81*t)+sin(2*PI*220*t)+0.6*sin(2*PI*277.18*t)+0.4*sin(2*PI*329.63*t))*(0.75+0.25*sin(2*PI*0.2*t))':d=32:s=44100" "afade=t=in:d=2,afade=t=out:st=29:d=3" music.mp3
for i in 1 2 3 4 5 6 7; do
  gen "anullsrc=r=44100:cl=stereo:d=4" - "vo-$i.mp3"
done
echo "Placeholders listos en $(pwd)"
