class SignUpSheetComponent extends React.Component {

  state = {
    people: [],
    fields: {
      name: '',
      email: ''
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { fields } = this.state;
    const people = [...this.state.people, fields];
    this.setState({
      people,
      fields: {
          name: '',
          email: ''
      }
    });
  };

  handleChange = (event) => {
      const { fields } = this.state;
      const { target: { name, value } } = event;
      fields[name] = value;
      this.setState({
          fields
      })
  };

  render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
              <input placeholder='Name' name="name" value={this.state.fields.name} onChange={this.handleChange}/>
              <input placeholder='Email' name="email" value={this.state.fields.email} onChange={this.handleChange}/>
              <input type='submit'/>
            </form>
            <div>
              <h3>Names List</h3>
              <ul>
                {this.state.people.map(({ name, email }, i) => <li key={i}>{name}, {email}</li>)}
              </ul>
            </div>
        </div>
    )
  }
}

ReactDOM.render(<SignUpSheetComponent/>, document.getElementById('content'));
