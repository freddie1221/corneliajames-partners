import React from 'react';

export default function DownloadAll({ images }) {
  if (!images || images.length === 0) return null;

  const handleDownloadAll = async () => {
    for (const { url, title } of images) {
      if (!url) continue;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${title.replace(/\s+/g, '_')}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  };

  return (
    <button
      onClick={handleDownloadAll}
      className="inline-block bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 text-center"
      title="Download All Images"
    >
      Download all images
    </button>
  );
}