"use client"

import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { assignAdjusterAction } from "@/app/ops/production/actions/assignAdjuster";
import Message from "./Message";

export default function ItemAdjustment({glovemakers, record}) {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const adjuster = formData.get('adjuster');
    
    try {
      const result = await assignAdjusterAction(record.productionRecordId, adjuster);
      if (result.success) { setMessage('Adjuster has been assigned'); } 
      else { setMessage(result.error || 'Something went wrong'); }
    } catch (error) {
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  }
  
  if (!record.awaitingAdjustment) { return null; }
  if (loading) { return <LoadingSpinner />; }
  if (message) { return <Message message={message} />; }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <h2 className="heading-secondary">Adjustment Needed</h2>
      
      <div className="bg-white p-4 rounded-lg w-full border-2 border-green-500">
        <div className="text-gray-700 w-full">Adjustment Needed</div>
        <div className="w-full text-lg">{record.adjustment}</div>
      </div>
      
      <div className="text-center my-2">Adjusted By</div>
      
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {glovemakers.map(adjuster => (
          <div key={adjuster} className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg">
            <input  
              type="radio"
              id={adjuster}
              name="adjuster"
              value={adjuster}
              className="w-6 h-6 cursor-pointer"
              required
            />
            <label 
              htmlFor={adjuster} 
              className="text-lg font-medium cursor-pointer flex-1 py-2"
            >
              {adjuster}
            </label>
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-3 rounded-lg">Assign</button>
      </form>
    </div>
  );
}