import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: [],
      yellowCards: [],
      redCards: [],
      minutes: 0,
      seconds: 0,
      player: "",
      team: "",
      event: "",
    };

    this.intervalId = null;
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds + 1,
        minutes:
          prevState.seconds === 59 ? prevState.minutes + 1 : prevState.minutes,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleInputChange = (event) => {
    this.setState({
      player: event.target.value,
    });
  };

  handleTeamChange = (event) => {
    this.setState({
      team: event.target.value,
    });
  };

  handleEventChange = (event) => {
    this.setState({
      event: event.target.value,
    });
  };

  handleAddGoal = () => {
    const { minutes, player, team, event } = this.state;

    if (event === "goal") {
      const goal = {
        min: minutes + 1,
        player,
        team,
      };

      this.setState((prevState) => ({
        goals: [...prevState.goals, goal],
        player: "",
        team: "",
        event: "",
      }));
    } else if (event === "yellowcard") {
      const yellowCard = {
        min: minutes + 1,
        player,
        team,
      };

      this.setState((prevState) => ({
        yellowCards: [...prevState.yellowCards, yellowCard],
        player: "",
        team: "",
        event: "",
      }));
    } else if (event === "redcard") {
      const redCard = {
        min: minutes + 1,
        player,
        team,
      };

      this.setState((prevState) => ({
        redCards: [...prevState.redCards, redCard],
        player: "",
        team: "",
        event: "",
      }));
    }
  };

  render() {
    const {
      minutes,
      seconds,
      goals,
      yellowCards,
      redCards,
      player,
      team,
      event,
    } = this.state;

    const minutesToShow = minutes < 10 ? `0${minutes}` : minutes;
    const secondsToShow = seconds < 10 ? `0${seconds}` : seconds;

    return (
      <div className="wrapper">
        <div style={{ position: "relative" }}>
          <div className="result" id="average">
            <span id="time">{`${minutesToShow}:${secondsToShow}`}</span>
          </div>
          <div className="result" id="average">
            <p>
              Morocco{" "}
              <span id="moroccoScore">
                {goals.filter((goal) => goal.team === "Morocco").length}
              </span>
            </p>
            <p>:</p>
            <p>
              <span id="franceScore">
                {goals.filter((goal) => goal.team === "France").length}
              </span>{" "}
              France
            </p>
          </div>
          <div>
            <input
              type="text"
              id="score"
              placeholder="Football player"
              value={player}
              onChange={this.handleInputChange}
            />
            <select id="team" value={team} onChange={this.handleTeamChange}>
              <option value="" disabled>
                Select team
              </option>
              <option value="Morocco">Morocco</option>
              <option value="France">France</option>
            </select>
            <select id="event" value={event} onChange={this.handleEventChange}>
              <option value="" disabled>
                Select event
              </option>
              <option value="goal">Goal</option>
              <option value="yellowcard">Yellow card</option>
              <option value="redcard">Red card</option>
            </select>
          </div>
          <div className="flex">
            <button id="addGoal" onClick={this.handleAddGoal}>
              Add Event
            </button>
          </div>
          <ul id="listOfGoals">
            {goals.map((goal, index) => (
              <li key={index}>
                {goal.player} ({goal.team}): Goal
              </li>
            ))}
            {yellowCards.map((card, index) => (
              <li key={index}>
                {card.player} ({card.team}): Yellow Card
              </li>
            ))}
            {redCards.map((card, index) => (
              <li key={index}>
                {card.player} ({card.team}): Red Card
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
