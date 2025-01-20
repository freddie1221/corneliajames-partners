"use client"

import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { assignGlovemakerAction } from "@/app/production/actions/glovemaker";
import Message from "./Message";

export default function AssignGlovemaker({glovemakers, record}) {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const glovemaker = formData.get('glovemaker');
    
    try {
      const result = await assignGlovemakerAction(record.productionRecordId, glovemaker);
      if (result.success) { setMessage('Glovemaker has been assigned'); } 
      else { setMessage(result.error || 'Something went wrong'); }
    } catch (error) {
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  }
  
  if (record.makerName || record.inventoryType === 'Purchased') { return null; }
  if (loading) { return <LoadingSpinner />; }
  if (message) { return <Message message={message} />; }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <h2 className="heading-secondary">Glovemaker Assignment</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {glovemakers.map(glovemaker => (
          <div key={glovemaker} className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-blue-500">
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
        <button type="submit" className="bg-blue-500 text-white btn uppercase tracking-wider">Assign</button>
      </form>
    </div>
  );
}