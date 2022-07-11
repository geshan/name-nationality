import React, { useState } from 'react';
import './App.css';

function App() {
  const [nationalities, setNationalities] = useState([]);
  const [message, setMessage] = useState('');
  const [personName, setPersonName] = useState('');

  async function fetchNewsStories () {
    try {

      const data = await (await fetch(`https://api.nationalize.io/?name=${personName}`)).json();
      setNationalities(data.country)
      const message = data.country.length ? `${data.country.length} guess(es) found` : 'No nationality match found';
      setMessage(message);
    } catch (err) {
      console.log(`err: ${err.mesasge}`, err);
      setMessage('could not fetch nationalities');
    }
  }

  const handleButtonClick = () => {
    setPersonName(personName);
    fetchNewsStories();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Check Name's Nationalities percent</h2>
        <div style={{ marginBottom: '20px' }}>
          <input
            name="personName"
            type="text"
            onChange={(e) => setPersonName(e.target.value)}
            value={personName}
            placeholder="Enter a person's name"
          />
          <button onClick={handleButtonClick}>Get Nationalities</button>
        </div>
        <div class="message">{message}</div>
        <div className="stories">
          {Array.isArray(nationalities) && nationalities.map(
            nationality => {
              const flagUrl = `https://flagcdn.com/w160/${nationality.country_id.toLowerCase()}.jpg`;
              const altText = `${nationality.country_id} flag`;
              return <div><h3>{nationality.country_id} - {(nationality.probability * 100).toFixed(2)}%</h3> <img src={flagUrl} alt={altText} /></div>
            }
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
