import React, { useEffect, useState } from 'react';
import MyForm from './myform';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'; // Import deleteDoc
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdatePage({ predictions, db }) {
  const [predictionsData, setPredictionsData] = useState(predictions);

  useEffect(() => {
    setPredictionsData(predictions);
  }, [predictions]);

  const updatePrediction = async (
    collectionName,
    predictionId,
    newStatus,
    newResults,
    newLeague,
    newHomeTeam,
    newAwayTeam,
    newMatchDate,
    newMatchTime,
    newPrediction,
    newOddvalue
  ) => {
    try {
      const predictionRef = doc(db, collectionName, predictionId);

      await updateDoc(predictionRef, {
        match_status: newStatus,
        results: newResults,
        league_name: newLeague,
        home_team: newHomeTeam,
        away_team: newAwayTeam,
        match_date: newMatchDate,
        match_time: newMatchTime,
        game_prediction: newPrediction,
        odd_value: newOddvalue,
      });
       
      // Show a success notification
      toast.success('Prediction updated successfully', {
        position: 'top-right',
        autoClose: 3000, // Close the notification after 3 seconds (adjust as needed)
      });

      // You can update the state here if needed.
    } catch (error) {
      console.error('Error updating prediction:', error);
      // Show an error notification if the update fails
      toast.error('Failed to update prediction', {
        position: 'top-right',
        autoClose: 3000, // Close the notification after 3 seconds (adjust as needed)
      });
    }
  };

  // Function to delete a prediction
  const deletePrediction = async (collectionName, predictionId) => {
    try {
      const predictionRef = doc(db, collectionName, predictionId);

      await deleteDoc(predictionRef);

      // Show a success notification
      toast.success('Prediction deleted successfully', {
        position: 'top-right',
        autoClose: 3000, // Close the notification after 3 seconds (adjust as needed)
      });

      // You can update the state here if needed.
    } catch (error) {
      console.error('Error deleting prediction:', error);
      // Show an error notification if the delete fails
      toast.error('Failed to delete prediction', {
        position: 'top-right',
        autoClose: 3000, // Close the notification after 3 seconds (adjust as needed)
      });
    }
  };

  return (
    <div>
      <h2>Update Page</h2>
      {Object.entries(predictionsData).map(([collectionName, predictionList]) => (
        predictionList.length > 0 && (
          <div key={collectionName}>
            <h3>{collectionName.toUpperCase()} Predictions</h3>
            {predictionList.map((prediction) => (
              <div key={prediction.id}>
                <MyForm
                  data={prediction}
                  onUpdate={(
                    newStatus,
                    newResults,
                    newLeague,
                    newHomeTeam,
                    newAwayTeam,
                    newMatchDate,
                    newMatchTime,
                    newPrediction,
                    newOddvalue
                  ) =>
                    updatePrediction(
                      collectionName,
                      prediction.id,
                      newStatus,
                      newResults,
                      newLeague,
                      newHomeTeam,
                      newAwayTeam,
                      newMatchDate,
                      newMatchTime,
                      newPrediction,
                      newOddvalue
                    )
                  }
                />
                <button onClick={() => deletePrediction(collectionName, prediction.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )))}
      <ToastContainer />
    </div>
  );
}

export default UpdatePage;
