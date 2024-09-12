import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../../context/StateContext';
import './Quotes.css'; 
import { useNavigate } from 'react-router';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { state } = useStateContext();
  const navigate = useNavigate();
  const limit = 20;


  useEffect(() => {
    if (!state.token) {
      navigate('/');
    }
  }, [state])

  const fetchQuotes = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `${state.token}`, 
          },
        }
      );
      const data = response.data;
      const fetchedQuotes = data?.data || [];
      if (fetchedQuotes.length === 0) {
        setHasMore(false); 
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
    if(state.token) {
      fetchQuotes();
    }
  }, [state]);

  
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
              <p className="quote-date">{new Date(quote.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

     
      <button className="fab" onClick={() => navigate('/new-quote')}>
        +
      </button>

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more quotes available.</p>}
    </div>
  );
};

export default Quotes;
