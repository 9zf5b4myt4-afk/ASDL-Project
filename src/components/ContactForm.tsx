'use client';

import { useState } from 'react';

export default function ContactForm({ labels }: { labels: any }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    const formData = new FormData(event.currentTarget);
    
    try {
      // 1. Send data to Formspree using YOUR ID
      const response = await fetch("https://formspree.io/f/xwpgaqlp", { 
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        // Reset form
        (event.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
        <p>Thank you for contacting us. We will get back to you soon.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-bold text-green-700 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">{labels.name}</label>
        <input 
          id="name"
          name="name"
          type="text" 
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-senegal-500 focus:bg-white focus:outline-none transition-colors" 
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">{labels.email}</label>
        <input 
          id="email"
          name="email"
          type="email" 
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-senegal-500 focus:bg-white focus:outline-none transition-colors" 
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">{labels.subject}</label>
        <input 
          id="subject"
          name="subject"
          type="text" 
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-senegal-500 focus:bg-white focus:outline-none transition-colors" 
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">{labels.message}</label>
        <textarea 
          id="message"
          name="message"
          required
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-senegal-500 focus:bg-white focus:outline-none transition-colors h-32"
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full bg-senegal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-senegal-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          labels.submit
        )}
      </button>
      
      {status === 'error' && (
        <p className="text-red-500 text-sm text-center mt-2">
          Something went wrong. Please try again later.
        </p>
      )}
    </form>
  );
}