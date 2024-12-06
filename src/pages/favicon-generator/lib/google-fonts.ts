const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${
  import.meta.env.VITE_GOOGLE_API_KEY
}`;

export type GoogleFont = {
  family: string;
  files: {
    regular: string;
  };
};

export async function fetchGoogleFonts(): Promise<GoogleFont[]> {
  const res = await fetch(url);
  const result = await res.json();
  return result.items;
}
