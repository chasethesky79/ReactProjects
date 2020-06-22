const CREDITCARD = 'CREDITCARD';
const BTC = 'BTC';
const divStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};

class Switch extends React.Component {
  state = {
    payMethod: BTC
  };

  handleChange = (event) => {
    console.log(`ELEMENT CLICKED ${JSON.stringify(event.target.value)}`);
    this.setState({
      payMethod: event.target.value
    })
  };

  render() {
    const message=`You selected ${this.state.payMethod}`;
    const selectedOption = this.state.payMethod;
    return (
        <div style={divStyle}>
          <select
              value={this.state.payMethod}
              onChange={this.handleChange}
          >
            <option value="CREDITCARD" selected={selectedOption == 'CREDITCARD'}>CREDITCARD</option>
            <option value="BTC" selected={selectedOption == 'BTC'}>BTC</option>
          </select>
          <p>{message}</p>
        </div>
    );
  }
}

ReactDOM.render(<Switch/>, document.getElementById('content'));
