import React, { useState } from 'react';

function MyForm({ data, onUpdate }) {
  const [newStatus, setNewStatus] = useState(data.match_status);
  const [newLeague, setNewLeague] = useState(data.league_name);
  const [newHomeTeam, setNewHomeTeam] = useState(data.home_team);
  const [newAwayTeam, setNewAwayTeam] = useState(data.away_team);
  const [newMatchDate, setNewMatchDate] = useState(data.match_date);
  const [newMatchTime, setNewMatchTime] = useState(data.match_time);
  const [newPrediction, setNewPrediction] = useState(data.game_prediction);
  const [newOddvalue, setNewOddValue] = useState(data.odd_value);
  const [newResults, setNewResults] = useState(data.results);



  const handleUpdate = () => {
    onUpdate(
      newResults,
      newLeague,
      newHomeTeam,
      newAwayTeam,
      newMatchDate,
      newMatchTime,
      newPrediction,
      newOddvalue,
      newStatus
    );
  };

  //const statusOptions = ["pending", "lost", "won"];

  return (
    <div>
      <div>
        <strong>League:</strong>
        <input
          type="text"
          value={newLeague}
          onChange={(e) => setNewLeague(e.target.value)}
        />
      </div>
      <div>
        <strong>Home Team:</strong>
        <input
          type="text"
          value={newHomeTeam}
          onChange={(e) => setNewHomeTeam(e.target.value)}
        />
      </div>
      <div>
        <strong>Away Team:</strong>
        <input
          type="text"
          value={newAwayTeam}
          onChange={(e) => setNewAwayTeam(e.target.value)}
        />
      </div>
      <div>
        <strong>Match Date:</strong>
        <input
          type="text"
          value={newMatchDate}
          onChange={(e) => setNewMatchDate(e.target.value)}
        />
      </div>
      <div>
        <strong>Match Time:</strong>
        <input
          type="text"
          value={newMatchTime}
          onChange={(e) => setNewMatchTime(e.target.value)}
        />
      </div>

      <div>
        <strong>Prediction:</strong>
        <input
          type="text"
          value={newPrediction}
          onChange={(e) => setNewPrediction(e.target.value)}
        />
      </div>

      <div>
        <strong>Odd value:</strong>
        <input
          type="text"
          value={newOddvalue}
          onChange={(e) => setNewOddValue(e.target.value)}
        />
      </div>

      <div>
        <strong>Results:</strong>
        <input
          type="text"
          value={newResults}
          onChange={(e) => setNewResults(e.target.value)}
        />
      </div>

      <div>
        <strong>status:</strong>
        <input
          type="text"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        />
      </div>
    
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default MyForm;
