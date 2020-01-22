import React, { Component } from "react";

import Plates from "../Plates/Plates";

const CARD_DRAFT = {
  name: "",
  balance: "",
  limit: "",
  apr: ""
};

class CreditTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [
        {
          id: 1,
          name: "Wells Fargo",
          balance: 9269,
          limit: 9500,
          apr: 16.99,
          show: false
        },
        {
          id: 2,
          name: "Chase",
          balance: 6564,
          limit: 6700,
          apr: 25.66,
          show: false
        },
        {
          id: 3,
          name: "Apple",
          balance: 2080,
          limit: 4500,
          apr: 23.49,
          show: false
        },
        {
          id: 4,
          name: "Best Buy",
          balance: 3612,
          limit: 4000,
          apr: 26.74,
          show: false
        }
      ],
      editMode: false,
      ...CARD_DRAFT
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode
    }));
  };

  onSubmit = event => {
    const { name, balance, limit, apr } = this.state;

    this.setState({
      cards: [
        ...this.state.cards,
        {
          name: name,
          balance: balance,
          limit: limit,
          apr: apr
        }
      ],
      editMode: false
    });

    this.setState({ ...CARD_DRAFT });

    event.preventDefault();
  };

  getPriority = (apr, percent) => {
    // console.log(apr);

    if (percent <= 30) {
      return "least-priority";
    }

    if (apr > 25) {
      return "top-priority";
    } else if (apr > 18 && apr <= 25) {
      return "upper-priority";
    } else if (apr > 10 && apr <= 18) {
      return "less-priority";
    } else {
      return "lesser-priority";
    }
  };

  onClick = index => {
    var newToggle = [...this.state.cards];
    // console.log(newToggle[index].show);
    if (this.state.cards[index].show) {
      newToggle[index].show = false;
      this.setState({ newToggle });
      console.log(this.state);
    } else {
      newToggle[index].show = true;
      this.setState({ newToggle });
      console.log(this.state);
    }
  };

  showInfo = index => {
    if (this.state.cards[index].show) {
      return "show-info";
    } else {
      return "hide-info";
    }
  };

  removeCard = name => {
    // this.state.cards.splice(this.state.cards.indexOf(name), 1);
    // console.log(name);
    // console.log(this.state.cards.filter(obj => obj.name !== name));

    var newCards = this.state.cards.filter(obj => obj.name !== name);

    this.setState({ cards: [...newCards] });
  };

  renderTableData() {
    return this.state.cards.map((card, index) => {
      const { id, name, balance, limit, apr } = card; //destructuring
      const percentUsed = (balance / limit) * 100;
      const interestMonth = (balance * apr) / 100 / 12;
      const minPayment = interestMonth + balance * 0.01;

      return (
        <tr className="card-and-plate" onClick={() => this.onClick(index)}>
          <Plates cards={this.state.cards[index]} />
          <div className={this.showInfo(index)}>
            <Titles />
            <tr className={this.getPriority(apr, percentUsed)} key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>${balance}</td>
              <td>${limit}</td>
              <td>{percentUsed.toFixed(2)}%</td>
              <td>{apr}%</td>
              <td>${interestMonth.toFixed(2)}</td>
              <td>${minPayment.toFixed(2)}</td>
              <button onClick={() => this.removeCard(name)}>Delete</button>
            </tr>
          </div>
        </tr>
      );
    });
  }

  render() {
    const { editMode, name, balance, limit, apr } = this.state;

    return (
      <div className="creditTable">
        <h1>Credit Table</h1>
        <table id="students">
          <tbody>{this.renderTableData()}</tbody>
        </table>
        {editMode ? (
          <div>
            <form onSubmit={this.onSubmit}>
              <input
                name="name"
                value={name}
                onChange={this.onChange}
                type="text"
                placeholder="Card Name"
              />
              <input
                name="balance"
                value={balance}
                onChange={this.onChange}
                type="number"
                placeholder="Balance"
              />
              <input
                name="limit"
                value={limit}
                onChange={this.onChange}
                type="number"
                placeholder="Card Limit"
              />
              <input
                name="apr"
                value={apr}
                onChange={this.onChange}
                type="number"
                placeholder="Card APR"
              />
              <button type="submit">Done</button>
            </form>
          </div>
        ) : (
          <button onClick={this.onToggleEditMode}>Add Another Card</button>
        )}
        <div style={{ paddingBottom: "50px" }}></div>
      </div>
    );
  }
}

const Titles = () => (
  <tr>
    <td>ID</td>
    <td>Name</td>
    <td>Balance</td>
    <td>Limit</td>
    <td>% Used</td>
    <td>APR</td>
    <td>Interest (Month)</td>
    <td>Minimum Payment</td>
  </tr>
);

export default CreditTable;
