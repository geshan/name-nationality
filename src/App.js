import { useState } from 'react';
import './App.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [nationalities, setNationalities] = useState([]);
  const [personName, setPersonName] = useState('');

  async function fetchNationalities() {
    const toastId = 'fetched-nationalities';
    try {
      const data = await (await fetch(`https://api.nationalize.io/?name=${personName}`)).json();
      const hasCountryData = data.country && data.country.length
      const nationalities =  hasCountryData ? data.country : [];
      setNationalities(nationalities);
          
      const message = hasCountryData ? `${data.country.length} guess(es) found` : 'No nationality match found';
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, //3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId,
        transition: Slide
      });
    } catch (err) {
      console.log(`err: ${err.message}`);
      setNationalities([]);
      toast.error('Cound not fetch nationalities, please try again later', {
        position: toast.POSITION.TOP_RIGHT,
        toastId
      });
    }
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
          <div className="toast-container"><ToastContainer limit={2}/></div>
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
