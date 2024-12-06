import JSZip from 'jszip';
import { Download } from 'lucide-react';
import { cn } from '~/lib/cn';
import { Button } from '~/ui/button';

import FaviconJS from '../lib/favicon/favicon';
import { dataURLToBlob } from '../lib/helper';
import { useGlobalContext } from './context';
import FaviconPreview from './favicon-preview';

function DownloadButton() {
  const handleDownload = async () => {
    const canvas = document.querySelector('[data-download] canvas');

    /*  */
    // 参考 https://github.com/johnsorrentino/favicon.js/blob/main/examples/bundle.html
    const favicon = new FaviconJS(canvas);
    const bundle = favicon.bundle();
    const files = [
      { name: 'favicon.ico', base64: bundle.ico },
      { name: 'android-chrome-192x192.png', base64: bundle.png192 },
      { name: 'android-chrome-512x512.png', base64: bundle.png512 },
      { name: 'apple-touch-icon.png', base64: bundle.png180 },
      { name: 'favicon-16x16.png', base64: bundle.png16 },
      { name: 'favicon-32x32.png', base64: bundle.png32 },
    ];

    /* Generate the zip file */
    const zip = new JSZip();

    // Add each base64 file to the ZIP
    files.forEach((file) => {
      const blob = dataURLToBlob(file.base64);
      zip.file(file.name, blob);
    });

    const blob = await zip.generateAsync({ type: 'blob' });

    /* Trigger download */
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'favicon.zip';
    a.click();
  };

  return (
    <Button variant="outline" size="icon" onClick={handleDownload}>
      <Download />
    </Button>
  );
}

export default function DownloadCart() {
  const context = useGlobalContext();

  return (
    <div className="space-y-4" data-download>
      {context.selectedFonts.length > 0 ? (
        <>
          {context.selectedFonts.map((font) => (
            <div
              key={font}
              className={cn('border-b py-3', 'grid grid-cols-3 items-center')}
            >
              <div style={{ fontFamily: font }}>{font}</div>
              <FaviconPreview font={font} />
              <div className="justify-self-end">
                <DownloadButton />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="py-4 text-center text-muted-foreground">
          No Favicons
        </div>
      )}
    </div>
  );
}
