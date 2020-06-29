class SignUpSheetComponent extends React.Component {

  state = {
    people: [],
    fields: {
      name: '',
      email: ''
    },
    errors: {
      name: '',
      email: ''
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { fields: { name, email } } = this.state;
    let errors = {};
    if (!name) {
        errors['name'] = 'Name is required';
    }
    if (!email) {
        errors['email'] = 'Email is required';
    }
   if (Object.keys(errors).length > 0) {
      this.setState({
          errors
      });
      return;
    }
    const people = [...this.state.people, { name, email }];
    this.setState({
      people,
      fields: {
          name: '',
          email: ''
      }
    });
  };

  handleChange = (event) => {
      const { target: { name, value } } = event;
      const { fields } = this.state;
      fields[name] = value;
      this.setState({
          fields
      })
  };

  render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <input placeholder='Name' name="name" value={this.state.fields.name} onChange={this.handleChange}/><span className='errorEntry'>{this.state.errors.name}</span>
              <input placeholder='Email' name="email" value={this.state.fields.email} onChange={this.handleChange}/><span className='errorEntry'>{this.state.errors.email}</span>
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
