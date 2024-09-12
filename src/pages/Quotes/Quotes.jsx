import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quotes.css'; // Create and style this CSS file as needed

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  // Fetch quotes from the API
  const fetchQuotes = async () => {
    if (!hasMore) return; // Stop fetching if no more quotes are available
    setLoading(true);
    try {
      const response = await axios.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: '<TOKEN>', 
          },
        }
      );
      const fetchedQuotes = response.data;
      console.log('first', response)
      if (fetchedQuotes.length === 0) {
        setHasMore(false); // Stop pagination if no more data
      } else {
        setQuotes((prevQuotes) => [...prevQuotes, ...fetchedQuotes]);
        setOffset((prevOffset) => prevOffset + limit);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchQuotes();
  }, []);

  
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight &&
      !loading &&
      hasMore
    ) {
      fetchQuotes();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="quotes-page">
      <h1>Quotes</h1>
      <div className="quotes-list">
        {quotes.map((quote, index) => (
          <div key={index} className="quote-card">
            <div className="quote-image-container">
              <img src={quote.mediaUrl} alt="quote" className="quote-image" />
              <div className="quote-text-overlay">{quote.text}</div>
            </div>
            <div className="quote-info">
              <p className="quote-username">{quote.username}</p>
              <p className="quote-date">{new Date(quote.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

     
      <button className="fab" onClick={() => alert('Create new quote')}>
        +
      </button>

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more quotes available.</p>}
    </div>
  );
};

export default Quotes;
