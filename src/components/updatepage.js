import React, { useEffect, useState } from 'react';
import MyForm from './myform';
import { doc, updateDoc } from 'firebase/firestore';
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
    newLeague,
    newHomeTeam,
    newAwayTeam,
    newMatchDate,
    newMatchTime,
    newPrediction
  ) => {
    try {
      const predictionRef = doc(db, collectionName, predictionId);

      await updateDoc(predictionRef, {
        match_status: newStatus,
        league_name: newLeague,
        home_team: newHomeTeam,
        away_team: newAwayTeam,
        match_date: newMatchDate,
        match_time: newMatchTime,
        game_prediction: newPrediction,
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

  return (
    <div>
      <h2>Update Page</h2>
      {Object.entries(predictionsData).map(([collectionName, predictionList]) => (
        predictionList.length > 0 && (
          <div key={collectionName}>
            <h3>{collectionName.toUpperCase()} Predictions</h3>
            {predictionList.map((prediction) => (
              <MyForm
                key={prediction.id}
                data={prediction}
                onUpdate={(
                  newStatus,
                  newLeague,
                  newHomeTeam,
                  newAwayTeam,
                  newMatchDate,
                  newMatchTime,
                  newPrediction
                ) =>
                  updatePrediction(
                    collectionName,
                    prediction.id,
                    newStatus,
                    newLeague,
                    newHomeTeam,
                    newAwayTeam,
                    newMatchDate,
                    newMatchTime,
                    newPrediction
                  )
                }
              />
            ))}
          </div>
        )))}
      <ToastContainer />
    </div>
  );
}

export default UpdatePage;
