"use client"

import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AssignGlovemaker({glovemakers, recordId, makerName}) {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const glovemaker = formData.get('glovemaker');

    const response = await fetch('/api/assign-glovemaker', {
      method: 'POST',
      body: JSON.stringify({ recordId, glovemaker })
    });

    await response.json();
    setLoading(false);
    window.location.reload(); 
  }

  if (makerName) {
    return null
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <h2 className="text-center text-xl font-bold">Assign Glovemaker</h2>
      <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
        {glovemakers.map(glovemaker => (
          <div key={glovemaker} className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg">
            <input
            type="radio"
            id={glovemaker}
            name="glovemaker"
            value={glovemaker}
            className="w-6 h-6 cursor-pointer"
          />
          <label 
            htmlFor={glovemaker} 
            className="text-lg font-medium cursor-pointer flex-1 py-2"
          >
            {glovemaker}
          </label>
        </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-3 rounded-lg">Assign</button>
      </form>
    </div>
  );
}