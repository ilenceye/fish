import { useEffect, useState } from 'react';

import { Loader2, Plus, X } from 'lucide-react';
import { cn } from '~/lib/cn';
import { Button } from '~/ui/button';
import {
  Pagination,
  PaginationProvider,
  usePagination,
} from '~/ui/pagination-plus';

import { loadFont } from '../lib/font';
import { type GoogleFont, fetchGoogleFonts } from '../lib/google-fonts';
import { useGlobalContext } from './context';
import FaviconPreview from './favicon-preview';

function AddToDownloadCart({ font }: { font: string }) {
  const context = useGlobalContext();

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-8"
      onClick={() => {
        if (context.selectedFonts.includes(font)) {
          context.setSelectedFonts({ type: 'delete', payload: font });
        } else {
          context.setSelectedFonts({ type: 'add', payload: font });
        }
      }}
    >
      {context.selectedFonts.includes(font) ? (
        <X className="text-red-500" />
      ) : (
        <Plus />
      )}
    </Button>
  );
}

type PreviewListProps = {
  fonts: GoogleFont[];
};

function PreviewList({ fonts }: PreviewListProps) {
  const { start, end } = usePagination();
  const { selectedFonts } = useGlobalContext();

  const currentFonts = fonts.filter((_, i) => i >= start && i <= end);

  return (
    <div className={cn('mx-auto w-fit', 'grid grid-cols-5')}>
      {currentFonts.map((font) => (
        <div
          key={font.family}
          className={cn('px-4 pt-4', 'hover:bg-secondary', 'group relative')}
        >
          <div className="mx-auto w-fit rounded border p-6">
            <FaviconPreview font={font.family} />
          </div>
          <div
            style={{ fontFamily: font.family }}
            className={cn(
              'max-w-[98px] truncate pb-3 pt-2 text-center text-sm',
              selectedFonts.includes(font.family) &&
                'decoration-brand underline decoration-2 underline-offset-4',
            )}
          >
            {font.family}
          </div>
          <div className="absolute right-2 top-1 hidden group-hover:block">
            <AddToDownloadCart font={font.family} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Preview() {
  const [fonts, setFonts] = useState<GoogleFont[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchGoogleFonts().then((fonts) => {
      fonts = fonts.slice(0, 200);
      setFonts(fonts);

      fonts.forEach((font) =>
        loadFont({ name: font.family, src: font.files.regular }),
      );

      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <Loader2 className="mx-auto animate-spin opacity-50" />
        </div>
      ) : (
        <PaginationProvider total={fonts.length} size={15}>
          <div className="space-y-6">
            <PreviewList fonts={fonts} />
            <Pagination max={5} />
          </div>
        </PaginationProvider>
      )}
    </>
  );
}
