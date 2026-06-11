from pathlib import Path

app = Path('src/App.tsx')
text = app.read_text('utf-8')
old = "const DEFAULT_TRACK_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';\n"
new = "const DEFAULT_TRACK_URL = new URL('./assets/images/Stephen Sanchez,Until I Found You.mp3', import.meta.url).href;\nconst WHITE_ROSES_IMAGE = new URL('./assets/images/white_roses_bouquet_1781207909642.png', import.meta.url).href;\n"
if old not in text:
    raise SystemExit('Old track URL not found in App.tsx')
text = text.replace(old, new, 1)
text = text.replace('src="/src/assets/images/white_roses_bouquet_1781207909642.jpg"', 'src={WHITE_ROSES_IMAGE}')
app.write_text(text, 'utf-8')

arabic = Path('src/components/ArabicInvitationDetail.tsx')
text = arabic.read_text('utf-8')
if 'const WHITE_ROSES_IMAGE' not in text:
    idx = text.index('const ARABIC_PLAYLIST')
    text = text[:idx] + "const WHITE_ROSES_IMAGE = new URL('../assets/images/white_roses_bouquet_1781207909642.png', import.meta.url).href;\n\n" + text[idx:]
text = text.replace('src="/src/assets/images/white_roses_bouquet_1781207909642.jpg"', 'src={WHITE_ROSES_IMAGE}')
arabic.write_text(text, 'utf-8')
print('patched')
