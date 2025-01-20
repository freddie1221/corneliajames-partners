"use client"

import { useEffect, useState } from 'react';

export default function useEmail() {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Missive) {
      const handleLoad = () => {
        setLoading(true)
        const conversationIds = window.Missive.getConversationIds();
        fetchAndDisplaySenderEmail(conversationIds);
      };

      const handleConversationChange = (ids) => {
        setLoading(true)
        fetchAndDisplaySenderEmail(ids);
      };
      
      window.Missive.on('load', handleLoad);
      window.Missive.on('change:conversations', handleConversationChange);

      // Cleanup function to remove event listeners
      return () => {
        window.Missive.off('load', handleLoad);
        window.Missive.off('change:conversations', handleConversationChange);
      };
    }
  }, []);

  const fetchAndDisplaySenderEmail = (ids) => {
    if (ids.length !== 1) { return }

    window.Missive.fetchConversations(ids).then((conversations) => {
      const latestMessage = conversations[0]?.latest_message
      const email = latestMessage?.from_field?.address

      setLoading(false)

      if (email) { setEmail(email) }
      else { setError('No email found for the selected conversation') }

    }).catch((err) => {
      console.error('Error fetching conversation data:', err);
      setError('Error fetching email');
      setLoading(false)
    });
  };
  
  setEmail("fredjlawson@gmail.com")

  return { email, loading, error }
}