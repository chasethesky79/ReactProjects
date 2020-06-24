class UserForm extends React.Component {
  state = {
    choice: 'Great'
  };

  handleButtonClick = (event) => {
    this.setState({
      choice: event.target.value
    })
  };

  render() {
    return (
        <div>
          <h1>What do you think of react</h1>
          <button name='button-1' value='Great' onClick={this.handleButtonClick}>Great</button>
          <button name='button-2' value='Amazing' onClick={this.handleButtonClick}>Amazing</button>
          User choice: {this.state.choice}
        </div>
    )
  }
}
ReactDOM.render(<UserForm/>, document.getElementById('content'));
