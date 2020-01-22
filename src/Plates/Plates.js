import React, { Component } from "react";

class Plates extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getPriority = (apr, percent) => {
    // console.log(apr);

    if (percent <= 30) {
      return "least-priority-plate";
    }

    if (apr > 25) {
      return "top-priority-plate";
    } else if (apr > 18 && apr <= 25) {
      return "upper-priority-plate";
    } else if (apr > 10 && apr <= 18) {
      return "less-priority-plate";
    } else {
      return "lesser-priority-plate";
    }
  };

  renderCardPlates() {
    // return this.props.cards.map((card, index) => {
    const { name, balance, apr, limit } = this.props.cards;
    const percentUsed = (balance / limit) * 100;

    return (
      <div className={`card--front ${this.getPriority(apr, percentUsed)}`}>
        <div className="card-name">{name}</div>
        <div className="card--number">**** **** **** 1111</div>
        <div className="card--exp">11/11</div>
        <div className="card--owner">Christian Simmons</div>
      </div>
    );
    // });
  }

  render() {
    const { cards } = this.props;

    // console.log(cards);

    return <div className="plates">{this.renderCardPlates()}</div>;
  }
}

export default Plates;
