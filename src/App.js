import React, { useState, useEffect } from 'react';
import './App.scss';

let quoteDBUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  const [quote, setQuote] = useState('Every step brings me closer to the next home run.');
  const [author, setAuthor] = useState( 'Babe Ruth');
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState('');

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parseJSON = await response.json();
    setQuotesArray(parseJSON.quotes);
    console.log(parseJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl);
  }, [quoteDBUrl])
  
  const showRandomQuote = () => {
    let randomNum = Math.floor(Math.random() * quotesArray.length);
    setRandomNumber(randomNum);
    setQuote(quotesArray[randomNum].quote);
    setAuthor(quotesArray[randomNum].author);
  }

  return (
    <div className="App">
      <div className='App-header'>
        <div id='quote-box'>
          <h1>{randomNumber}</h1>
          <p id='text'>" {quote} "</p>
          <p id='author'>- {author}</p>
          <a href={ encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)} id='tweet-quote'><i class="fa fa-twitter"></i></a>
          <button id='new-quote' onClick={() => showRandomQuote()}>Random Quote</button>
        </div>
      </div>
    </div>
  );
}

export default App;
