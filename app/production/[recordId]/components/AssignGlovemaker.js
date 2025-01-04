"use client"

import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { assignGlovemakerAction } from "@/app/production/actions/glovemaker";

export default function AssignGlovemaker({glovemakers, productionRecordId, makerName}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const glovemaker = formData.get('glovemaker');
    
    try {
      const result = await assignGlovemakerAction(productionRecordId, glovemaker);
      
      if (result.success) {
        window.location.reload();
      } else {
        setError(result.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }
  if(makerName) {
    return null;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="p-4 bg-white rounded-lg">{error}</div>;
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
              required
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