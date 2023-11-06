import React, { useState } from 'react';
import './PredictionForm.css';
import { insertOrUpdateInCollection } from '../api/api';

function PredictionForm({ collectionName, isUpdating }) {
    const initialPrediction = {
        league_name: '',
        home_team: '',
        away_team: '',
        match_date: '',
        match_time: '',
        odd_value: 0,
        game_prediction: '',  // Updated property name from "prediction" to "game_prediction"
        match_status: '',
        results: '',
    };
    


    const [formData, setFormData] = useState(initialPrediction);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            if (isUpdating) {
                await insertOrUpdateInCollection(collectionName, formData, formData.docId);
                console.log(`${collectionName} prediction updated successfully`);
            } else {
                await insertOrUpdateInCollection(collectionName, formData);
                console.log(`${collectionName} prediction inserted successfully`);
                console.log(formData);
            }

            setFormData(initialPrediction);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="prediction-form-container">
            <h3 className="form-title">
                {isUpdating ? `Update ${collectionName} Prediction` : `Insert ${collectionName} Prediction`}
            </h3>
            <form className="prediction-form" onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="league_name">League:</label>
                    <input
                        type="text"
                        id="league_name"
                        name="league_name"
                        placeholder="Enter League"
                        value={formData.league_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="home_team">home_team Team:</label>
                    <input
                        type="text"
                        id="home_team"
                        name="home_team"
                        placeholder="Enter home_team Team"
                        value={formData.home_team}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="away_team">away_team Team:</label>
                    <input
                        type="text"
                        id="away_team"
                        name="away_team"
                        placeholder="Enter away_team Team"
                        value={formData.away_team}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="match_time">Match match_time:</label>
                    <input
                        type="text"
                        id="match_time"
                        name="match_time"
                        placeholder="Enter Match match_time"
                        value={formData.match_time}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="game_prediction">Game game_prediction:</label>
                    <input
                        type="text"
                        id="game_prediction"  // Updated property name from "prediction" to "game_prediction"
                        name="game_prediction"  // Updated property name from "prediction" to "game_prediction"
                        placeholder="Enter Game game_prediction"  // Updated placeholder text
                        value={formData.game_prediction}  // Updated property name from "prediction" to "game_prediction"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="date">Match Date:</label>
                    <input
                        type="text"
                        id="match_date"
                        name="match_date"
                        placeholder="Enter Match Date"
                        value={formData.match_date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="match_status">match_status:</label>
                    <input
                        type="text"
                        id="match_status"
                        name="match_status"
                        placeholder="pending/lost/won"
                        value={formData.match_status}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label htmlFor="odd_value">Odd Value:</label>
                    <input
                        type="text"
                        id="odd_value"
                        name="odd_value"
                        placeholder="Enter Odd Value"
                        value={formData.odd_value}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="results">Results:</label>
                    <input
                        type="text"
                        id="results"
                        name="results"
                        placeholder="Resulst"
                        value={formData.results}
                        onChange={handleChange}
                    />
                </div>
                

                <button className="submit-button" type="submit">
                    {isUpdating ? 'Update' : 'Insert'} Prediction
                </button>
            </form>
        </div>
    );
}

export default PredictionForm;
