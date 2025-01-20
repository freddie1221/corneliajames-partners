"use client"

import { useState } from "react";
import { reviewPassAction } from "../actions/reviewPass";
import { reviewFailAction } from "../actions/reviewFail";
import LoadingSpinner from "@/components/LoadingSpinner";
import Message from "./Message";

export default function ItemReview({record, reviewers}) {
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [action, setAction] = useState('pass');

  if (record.reviewer) { return null }
  if (!record.makerName && record.inventoryType === 'Made') { return null }
  if (record.awaitingAdjustment) { return null }
  if (loading) { return <LoadingSpinner />; }
  if (message) { return <Message message={message} />; }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <h2 className="heading-secondary">Item Review</h2>
      <ReviewOptions setAction={setAction} action={action} />
      <PassReview reviewers={reviewers} action={action} record={record} setLoading={setLoading} setMessage={setMessage}/>
      <FailReview reviewers={reviewers} action={action} record={record} setLoading={setLoading} setMessage={setMessage}/>
    </div>
  )
}

function ReviewOptions({setAction, action}) {
  return (
    <div className="flex gap-2 mb-2">
      <button 
        className={`btn w-full bg-green-500 text-white ${action === 'pass' ? 'border-gray-900' : 'border-green-500'}`} 
        onClick={() => setAction('pass')}
        disabled={action === 'pass'}
      >Pass</button>
      <button 
        className={`btn w-full bg-red-500 text-white ${action === 'fail' ? 'border-gray-900' : 'border-red-500'}`} 
        onClick={() => setAction('fail')}
        disabled={action === 'fail'}
      >Fail</button>
    </div>
  )
}

function PassReview({reviewers, action, record, setLoading, setMessage}) {
  if(action === 'fail') {
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const reviewer = formData.get('reviewer');
    
    try {
      const result = await reviewPassAction(record.id, reviewer);
      
      if (result.success) { setMessage('This item has been passed'); } 
      else { setMessage(result.error || 'Something went wrong'); }

    } catch (error) {
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="heading-tertiary text-center mb-2">Select Reviewer</h3>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {reviewers.map(reviewer => (
            <div key={reviewer} className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg">
            <input  
              type="radio"
              id={reviewer}
              name="reviewer"
              value={reviewer}
              className="w-6 h-6 cursor-pointer"
              required
            />
            <label 
              htmlFor={reviewer} 
              className="text-lg font-medium cursor-pointer flex-1 py-2"
            >
              {reviewer}
            </label>
          </div>
        ))}
        <button type="submit" className="btn bg-green-500 border-green-500 text-white">Submit Pass</button>
      </form>
    </div>
  )
}

function FailReview({action, record, setLoading, setMessage}) {

  if(action === 'pass') {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const comments = formData.get('comments');

    try {
      const result = await reviewFailAction(record.productionRecordId, comments);
      if (result.success) { setMessage('This item has been failed. Please return it to the glovemaker for amendments.'); } 
      else { setMessage(result.error || 'Something went wrong'); }
    } catch (error) {
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return(
    <div>
      <h3 className=" text-center mb-2">Reviewer Notes</h3>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <textarea
          name="comments" 
          className="textarea rounded-md w-full px-6 py-4 mb-2 text-lg" 
          placeholder="Enter comments for the glovemaker here..." 
          required
        />
        <button type="submit" className="bg-red-500 border-red-500 text-white btn">Submit Fail</button>
      </form>
    </div>
  )
}