import { useState } from 'react';
import './App.css';
import classNames from 'classnames';

function App() {
  const [nationalities, setNationalities] = useState([]);
  const [message, setMessage] = useState('');
  const [personName, setPersonName] = useState('');
  const [messageClassNames, setMessageClassNames] = useState('');

  async function fetchNationalities() {
    let errorInFetch = false;
    try {
      const data = await (await fetch(`https://api.nationalize.io/?name=${personName}`)).json();
      const hasCountryData = data.country && data.country.length
      const nationalities =  hasCountryData ? data.country : [];
      setNationalities(nationalities);
          
      const message = hasCountryData ? `${data.country.length} guess(es) found` : 'No nationality match found';
      setMessage(message);
    } catch (err) {
      console.log(`err: ${err.message}`);
      errorInFetch = true;
      setNationalities([]);      
      setMessage('Could not fetch nationalities, try again later.');
    }

    const msgClassNames = classNames({
      message: true,
      'success': !errorInFetch,
      'error': errorInFetch,
    });
    setMessageClassNames(msgClassNames);
  }

  async function handleSubmit(e){
    e.preventDefault();
    await fetchNationalities();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-form">
          <h2>Check Name's Nationalities percent</h2>
          <div style={{ marginBottom: '20px' }}>
            <form name="nationalities-form" onSubmit={handleSubmit}>
              <input
                name="personName"
                type="text"
                onChange={(e) => setPersonName(e.target.value)}
                value={personName}
                placeholder="Enter a person's name"
              />
              <button onClick={handleSubmit}>Get Nationalities</button>
            </form>
          </div>
        </div>
        <div className="results">
          <div className={messageClassNames}>{message}</div>
          <div className="nationalities">
            {Array.isArray(nationalities) && nationalities.map(
              nationality => {
                const flagUrl = `https://flagcdn.com/w160/${nationality.country_id.toLowerCase()}.jpg`;
                const altText = `${nationality.country_id} flag`;
                return <div key={nationality.country_id}><h3>{nationality.country_id} - {(nationality.probability * 100).toFixed(2)}%</h3> <img src={flagUrl} alt={altText} style={{
                  border: "1px solid black"
                }} /></div>
              }
            )}
          </div>
        </div>        
      </header>
    </div>
  );
}

export default App;
