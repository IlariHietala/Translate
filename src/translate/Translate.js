import React, {useState} from 'react'
import axios from 'axios';

const API_URL = "https://google-translate1.p.rapidapi.com/language/translate/v2"
const API_KEY = "API-AVAIN TÄHÄN"

function Translate() {
    const [inputText, setInputText] = useState('');
    const [translation, setTranslation] = useState('');
    const [ekakieli, setEkakieli] = useState('fi')
    const [tokakieli, setTokakieli] = useState('en')
  

      const handleTranslation = async () => {

        if(ekakieli === 'fi') {
        setTokakieli('en');
        } else if(ekakieli === 'en') {
            setTokakieli('fi');
        }


        const encodedParams = new URLSearchParams();
        encodedParams.set('q', inputText);
        encodedParams.set('target', tokakieli);
        encodedParams.set('source', ekakieli);
  
        const options = {
          method: 'POST',
          url: API_URL,
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
          },
          data: encodedParams,
        };



  
        try {
          const response = await axios.request(options);
          setTranslation(response.data.data.translations[0].translatedText);
        } catch (error) {
          console.error(error);
        }
      };
  

  
    return (
      <div className="App">
        <h1>Kääntäjä</h1>
        <div>
        <p>Valitse kieli:</p>
        <input type="radio" name="ekakieli" value="fi" checked={ekakieli === 'fi'} onChange={() => setEkakieli('fi')} /><label>Suomi - Englanti</label>
        <input type="radio" name="ekakieli" value="en" checked={ekakieli === 'en'} onChange={() => setEkakieli('en')} /><label>Englanti - Suomi</label>
        </div>
        <h2>Syötä käännettävä teksti:</h2>
        <textarea
          rows="4"
          cols="50"
          placeholder="Write here"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}/>
        <div>
        <button onClick={handleTranslation}>Käännä</button>
        </div>
        <div>
          <p>Käännös:</p>
          <strong>{translation}</strong>
        </div>
      </div>
    );
  }

  export default Translate;