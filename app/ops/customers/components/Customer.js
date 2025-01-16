"use client"

import { useEffect, useState } from 'react';

export default function CustomersPage() {
  const [senderEmail, setSenderEmail] = useState('Loading...');
  const [message, setMessage] = useState('checking...');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Missive) {
      
      // Initialize Missive event listeners
      window.Missive.on('load', () => {
        const conversationIds = window.Missive.getConversationIds();
        fetchAndDisplaySenderEmail(conversationIds);
      });

      window.Missive.on('change:conversations', (ids) => {
        fetchAndDisplaySenderEmail(ids);
      });
    }
    if ( window.Missive ) {
      setMessage('Rendered on Missive');
    } else {
      setMessage('Not rendered on Missive');
    }
  }, []);

  const fetchAndDisplaySenderEmail = (ids) => {
    if (ids.length !== 1) {
      setSenderEmail('No conversation selected or multiple selected');
      return;
    }

    window.Missive.fetchConversations(ids).then((conversations) => {
      const latestMessage = conversations[0]?.latest_message;
      const email = latestMessage?.from_field?.address;

      if (email) {
        setSenderEmail(email);
      } else {
        setSenderEmail('No email found for the selected conversation');
      }
    }).catch((err) => {
      console.error('Error fetching conversation data:', err);
      setSenderEmail('Error fetching email');
    });
  };

  return (
    <div>
      <h1>Customer Information</h1>
      <p>Email: <span>{senderEmail}</span></p>
      <p>Message: <span>{message}</span></p>
    </div>
  );
}