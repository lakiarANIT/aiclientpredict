import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import UpdatePage from './components/updatepage';
import { firestore } from './firebaseconfig';
import PredictionForm from './components/predictionform';
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'; // Import Firestore specific functions

import './App.css';

const collections = [
  'generalpredictions',
  'ov3predictions',
  'ov5predictions',
  'bttspredictions',
  'htftpredictions',
  'cspredictions',
];

function App() {
  const db = firestore;
  const [predictions, setPredictions] = useState({
    generalpredictions: [],
    ov3predictions: [],
    ov5predictions: [],
    bttspredictions: [],
    htftpredictions: [],
    cspredictions: [],
  });

  const [searchDate, setSearchDate] = useState(''); // State for the search date
  const [searchResults, setSearchResults] = useState(null); // State for search results

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const updatedPredictions = {};

        for (const collectionName of collections) {
          const collectionQuery = collection(firestore, collectionName);
          const snapshot = await getDocs(collectionQuery);

          if (!snapshot.empty) {
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            updatedPredictions[collectionName] = data;
          }
        }

        setPredictions(updatedPredictions);
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    fetchPredictions();
  }, []);

  // Function to handle date search
  const handleDateSearch = () => {
    const formattedSearchDate = searchDate.trim(); // Remove leading/trailing spaces
  
    if (formattedSearchDate) {
      const filteredResults = {};
  
      for (const collectionName of collections) {
        if (predictions[collectionName]) { // Check if the collection exists
          const collectionPredictions = predictions[collectionName];
          const filteredCollection = collectionPredictions.filter((prediction) => {
            // Assuming 'date' is the property in your prediction data in DD.MM.YYYY format
            return prediction.date === formattedSearchDate;
          });
          filteredResults[collectionName] = filteredCollection;
        }
      }
  
      setSearchResults(filteredResults);
    } else {
      setSearchResults(null); // Clear search results if the search date is empty
    }
  }

  return (
    <Router>
      <div className="App">
        <h1>Prediction Form</h1>

        <div className="nav-links">
          <Link to="/update">Update by Date</Link>
          <Link to="/insert">Add New Games</Link>
        </div>

        <div>
          <input
            type="text"
            placeholder="DD.MM.YYYY"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <button onClick={handleDateSearch}>Search</button>
        </div>

        <Switch>
          <Route path="/insert">
            <div>
              {collections.map((collectionName) => (
                <div key={collectionName}>
                  <h2>{collectionName} Predictions</h2>
                  <PredictionForm collectionName={collectionName} isUpdating={true} />
                </div>
              ))}
            </div>
          </Route>
          <Route path="/update">
            <UpdatePage predictions={searchResults || predictions} db={db} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
