"use client"

import { useEffect, useState } from 'react';

export default function CustomersPage() {
  const [senderEmail, setSenderEmail] = useState('Loading...');
  const [subject, setSubject] = useState('checking...');

  useEffect(() => {
    Missive.on('change:conversations', (ids) => {
      Missive.fetchConversations(ids).then((conversations) => {
        if (conversations.length != 1) {
          // Do nothing if multiple conversations are selected.
          return
        }
    
        var message = conversations[0].latest_message
        if (!message || !message.from_field) {
          // Do nothing if conversation has no message (only chat comments) or if
          // message has no From field.
          return
        }
    
        var from = message.from_field
        setSenderEmail(from.name + ' ' + from.address)
        setSubject(message.subject)
      })
    })
  }, []);

  return (
    <div>
      <h1>Customer Information</h1>
      <p>Email: <span>{senderEmail}</span></p>
      <p>Subject: <span>{subject}</span></p>
    </div>
  );
}