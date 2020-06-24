const CREDITCARD = 'CREDITCARD';
const BTC = 'BTC';
const divStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row'
};

class Switch extends React.Component {
  state = {
    payMethod: BTC
  };

  select = (choice) => {
    return (event) => {
      this.setState({
        payMethod: choice
      })
    }
  };

  renderChoice = (choice) => {
    let cssClasses = ['choice'];
    if (this.state.payMethod === choice) {
       cssClasses = [...cssClasses, styles.active]
    }
    return (
        <div onClick = {this.select(choice)} className={cssClasses}>{choice}</div>
    )
  };

  render() {
    return (
        <div className={divStyle}>
          {this.renderChoice(CREDITCARD)}
          {this.renderChoice(BTC)}
        </div>
    );
  }
}

ReactDOM.render(<Switch/>, document.getElementById('content'));
