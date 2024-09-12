import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useStateContext } from '../../context/StateContext';
import "./NewQuote.css";

const NewQuote = () => {
  const [quoteText, setQuoteText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const { state } = useStateContext();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleQuoteTextChange = (e) => {
    setQuoteText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quoteText || !imageFile) {
      setError('Please enter a quote and select an image.');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const uploadResponse = await axios.post(
        'https://crafto.app/crafto/v1.0/media/assignment/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const mediaUrl = uploadResponse?.data?.[0]?.url;

      if (!mediaUrl) {
        setError('Failed to upload image. No media URL received.');
        setIsUploading(false);
        return;
      }

    
      await axios.post(
        'https://assignment.stage.crafto.app/postQuote',
        {
          text: quoteText,
          mediaUrl,
        },
        {
          headers: {
            Authorization: `${state.token}`, 
            'Content-Type': 'application/json',
          },
        }
      );

      setQuoteText('');
      setImageFile(null);
      navigate('/quote');
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'Access denied. Please check your authorization token.'
          : 'Failed to create quote. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (!state.token) {
      navigate('/');
    }
  }, [state])

  return (
    <div className="new-quote-container">
      <h2>Create a New Quote</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="quoteText">Quote Text:</label>
          <textarea
            id="quoteText"
            value={quoteText}
            onChange={handleQuoteTextChange}
            placeholder="Enter your quote here..."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="imageUpload" className='upload'>Upload Image:</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Create Quote'}
        </button>
      </form>
    </div>
  );
};

export default NewQuote;
