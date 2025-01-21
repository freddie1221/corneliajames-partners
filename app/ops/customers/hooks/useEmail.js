"use client"

import { useEffect, useState } from 'react';

export default function useEmail() {
  const [email, setEmail] = useState('fredjlawson@gmail.com');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Missive) {
      
      const handleLoad = () => {
        const conversationIds = window.Missive.getConversationIds();
        fetchAndDisplaySenderEmail(conversationIds);
      };

      const handleConversationChange = (ids) => { fetchAndDisplaySenderEmail(ids) }
      
      window.Missive.on('main_action', handleLoad);
      window.Missive.on('change:conversations', handleConversationChange);

    } else {
      setEmail('fredjlawson@gmail.com')
    }
  }, []);

  const fetchAndDisplaySenderEmail = (ids) => {
    if (ids.length !== 1) { return }

    window.Missive.fetchConversations(ids).then((conversations) => {
      const senderEmail = conversations[0]?.latest_message?.from_field?.address

      if (senderEmail) { setEmail(senderEmail) }
      else { setEmail('fredjlawson@gmail.com') }

      console.log(senderEmail)

    }).catch((err) => {
      console.error('Error fetching conversation data:', err);
    });
  };

  console.log(email)
  return { email }
}