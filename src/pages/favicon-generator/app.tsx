import Configure from './components/configure';
import DownloadCart from './components/download-card';
import HTMLCode from './components/html-code';
import Preview from './components/preview';
import Step from './components/step';

export default function App() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="grid grid-cols-3 gap-4">
        <Step title="Configure">
          <Configure />
        </Step>
        <Step title="Preview" className="col-span-2">
          <Preview />
        </Step>
      </div>
      <Step title="Download">
        <DownloadCart />
      </Step>
      <Step title="HTML Code">
        <HTMLCode />
      </Step>
    </div>
  );
}
