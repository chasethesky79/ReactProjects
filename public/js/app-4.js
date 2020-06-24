class SignUpSheetComponent extends React.Component {

  state = {
    names: [],
    name: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let { name } = this.state;
    const names = [...this.state.names, name];
    name = '';
    this.setState({
      names,
      name
    });
  };

  handleNameChange = (event) => {
      this.setState({
          name: event.target.value
      })
  };

  render() {
    return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder='Name' value={this.state.name} onChange={this.handleNameChange}/>
          <input type='submit'/>
        </form>
        <div>
          <h3>Names List</h3>
          <ul>
            {this.state.names.map((name, i) => <li key={i}>{name}</li>)}
          </ul>
        </div>
        </div>
    )
  }
}

ReactDOM.render(<SignUpSheetComponent/>, document.getElementById('content'));
