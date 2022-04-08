import React, { useState, useEffect } from 'react';
import './App.scss';
import ColorArray from './ColorsArray';

let quoteUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  const [quote, setQuote] = useState('Every step brings me closer to the next home run.');
  const [author, setAuthor] = useState( 'Babe Ruth');
  const [quotesArray, setQuotesArray] = useState('');
  const [accentColor, setAccentColor] = useState('#333333');


  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parseJSON = await response.json();
    setQuotesArray(parseJSON.quotes);
    console.log(parseJSON)
  }

  useEffect(() => {
    fetchQuotes(quoteUrl);
  }, [quoteUrl])
  
  const showRandomQuote = () => {
    let randomNum = Math.floor(Math.random() * quotesArray.length);
    setAccentColor(ColorArray[randomNum]);
    setQuote(quotesArray[randomNum].quote);
    setAuthor(quotesArray[randomNum].author);
  }

  return (
    <div className="App" style={{backgroundColor: `${accentColor}`}}>
      <div id='quote-box' style={{ color: `${accentColor}`}}>
          <p id='text'><i class="fa fa-quote-left"></i>{quote}</p>
          <p id='author'>- {author}</p>
          <div className='buttons'>
            <a href={ encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)} className='button' id='tweet-quote' style={{backgroundColor: `${accentColor}`}}><i class='fa fa-twitter'></i></a>
            <a href={ encodeURI(`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=${quote} - ${author}`)} className='button' id='tumblr-quote' style={{backgroundColor: `${accentColor}`}}><i class="fa fa-tumblr"></i></a>
            <button className='button' id='new-quote' onClick={() => showRandomQuote()} style={{backgroundColor: `${accentColor}`}}>New Quote</button>
          </div>
        </div>
    </div>
  );
}

export default App;
