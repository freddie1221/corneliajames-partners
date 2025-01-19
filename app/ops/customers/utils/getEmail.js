"use client"

import { useEffect, useState } from 'react';

export default function getEmail() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    Missive.on('change:conversations', (ids) => {
      Missive.fetchConversations(ids).then((conversations) => {
        
        if (conversations.length !== 1) {
          return
        }
    
        const message = conversations[0].latest_message;
        if (!message || !message.from_field) {
          return
        }
        
        setEmail(message.from_field.address);
      });
    });

    // Cleanup function to remove event listener
    return () => {
      Missive.off('change:conversations');
    };
  }, []);

  return email;
}