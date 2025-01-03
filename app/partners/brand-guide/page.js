import '../globals.css';
import DownloadButton from '../../components/DownloadButton';

export default function BrandGuide() {
  return (
    <div className="container mx-auto p-10 text-gray-900">
      <h1 className="text-5xl font-heading mb-8">Brand Guide</h1>
      
      {/* Colors Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-heading font-bold mb-4">Colors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-primCol rounded-lg mb-2"></div>
            <p className="text-lg">Primary Color</p>
            <p className="text-sm text-gray-600">#1a1a1a</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-secCol rounded-lg mb-2 border border-black"></div>
            <p className="text-lg">Secondary Color</p>
            <p className="text-sm text-gray-600">#F5F3ED</p>
          </div>
        </div>
      </section>
      
      {/* Fonts Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold font-heading mb-4">Fonts</h2>
        <div className="space-y-8">
          <div>
            <p className="text-2xl font-heading">ITC Caslon No 224 Medium (standard)</p>
            <p className="text-lg text-gray-600">Headings</p>
            <DownloadButton url="/fonts/ITC_Caslon_No_224_Medium.ttf" title="ITC Caslon No 224 Medium" />
          </div>
          <div>
            <p className="text-2xl font-sans">Avenir Next (medium)</p>
            <p className="text-lg text-gray-600">Body text</p>
            <DownloadButton url="/fonts/Avenir_Next_Medium.ttf" title="Avenir Next Medium" />
          </div>
        </div>
      </section>
      
      {/* Logos Section */}
      <section>
      <h2 className="text-3xl font-bold font-heading mb-4">Logos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <p className="text-lg">Primary Logo</p>
            <img src="/logo_solo.png" alt="Logo 1" className="w-100 h-32 object-contain mb-2" />
            <DownloadButton url="/logo_solo.png" title="Primary Logo" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg">Royal Warrant</p>
            <img src="/crest.png" alt="Logo 2" className="h-60 object-contain mb-2" />
            <DownloadButton url="/royal_warrant.png" title="Royal Warrant" />
          </div>
        </div>
      </section>

      <section>
      <h2 className="text-3xl font-bold font-heading mb-4">Other Assets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img src="/cornelia.png" alt="Logo 1" className="w-300 object-contain mb-2" />
            <p className="text-lg">Cornelia James (founder)</p>
            <DownloadButton url="/cornelia.png" title="Cornelia" />
          </div>
        </div>
      </section>
    </div>
  );
}