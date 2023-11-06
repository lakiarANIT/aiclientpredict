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

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const updatedPredictions = {};

        for (const collectionName of collections) {
          const collectionQuery = collection(firestore, collectionName);
          const pendingQuery = query(collectionQuery, where('match_status', '==', 'pending'));
          const snapshot = await getDocs(pendingQuery);

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
  }, []); // Remove 'firestore' from the dependency array as it doesn't need to be there

  return (
    <Router>
      <div className="App">
        <h1>Prediction Form</h1>

        <div className="nav-links">
          <Link to="/update">Update pending</Link>
          <Link to="/insert">Add New Games</Link>
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
          <UpdatePage predictions={predictions} db={db}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
