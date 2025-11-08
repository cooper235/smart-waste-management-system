"use client"

import { useState } from 'react';
import { X, Send } from 'lucide-react';

const Feedback = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get user ID from localStorage or use 'anonymous' if not logged in
      const userId = localStorage.getItem('userId') || 'anonymous';
      
      // Prepare the data to send
      const feedbackData = {
        ...formData,
        userId,
        category: 'general', // Add default category
        rating: Number(formData.rating) // Ensure rating is a number
      };

      console.log('Submitting feedback:', feedbackData);
      
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(feedbackData),
        credentials: 'include' // Include cookies for authentication
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error('Failed to parse JSON response:', jsonError);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        console.error('Server error response:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });
        
        // Handle validation errors
        if (responseData.errors && responseData.errors.length > 0) {
          const errorMessages = responseData.errors.map(err => 
            `- ${err.field}: ${err.message}`
          ).join('\n');
          throw new Error(`Please fix the following issues:\n${errorMessages}`);
        }
        
        throw new Error(responseData.message || `Server error: ${response.status} ${response.statusText}`);
      }

      console.log('Feedback submitted successfully:', responseData);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', {
        error: error.message,
        stack: error.stack,
        formData: formData
      });
      alert(`Failed to submit feedback: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl z-50 p-6">
        <div className="text-green-500 text-center">
          <div className="text-4xl mb-2">✓</div>
          <h3 className="text-lg font-semibold mb-1">Thank You!</h3>
          <p className="text-sm text-gray-600">Your feedback has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl z-50">
      <div className="bg-[#4CAF50] text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Send us your feedback</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            required
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            required
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                className={`text-2xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center px-4 py-2 bg-[#4CAF50] text-white rounded-md hover:bg-[#43A047] disabled:opacity-50"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Send Feedback
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;