type Font = { name: string; src: string };

export async function loadFont({ name, src }: Font) {
  // const fontAlreadyLoaded = document.fonts.check(`10px ${name}`);
  // if (!fontAlreadyLoaded) {
  const fontFace = new FontFace(name, `url(${src})`);

  try {
    await fontFace.load();
    document.fonts.add(fontFace);
  } catch {
    console.error(`Font ${name} failed to load`);
  }
}
