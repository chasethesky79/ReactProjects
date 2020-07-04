class Field extends React.Component {

    state = {
        value:'',
        error: ''
    };

    onChange = (event) => {
        const { value } = event.target;
        const error = this.props.validate ? this.props.validate(event) : '';
        this.setState({
            value,
            error
        });
        this.props.updateState(event);
    };
 render() {
     return (
         <div>
             <input className={'input-entry'} placeholder={this.props.placeholder} name={this.props.name} value ={this.state.value} error={this.state.error}  onChange={this.onChange}/>
             <span style= {{color:'red'}}>{this.state.error}</span>
         </div>
     )
   }
}

class Parent extends React.Component {

    state = {
        formObject: {
            name: '',
            email:''
        },
        people : [],
        errors: {
            name: 'Required',
            email: 'Required'
        },
        disabled: true
    };

    validateEmail = (event) => {
        const { target: { value }} = event;
        const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const isInvalid = value && !re.test(value);
        const error = isInvalid ? 'Invalid Email' : !value ? 'Email Required' : '';
        this.setState(prevState => ({
            errors: Object.assign({}, prevState.errors, { email: error })
        }));
        return error;
    };

    validateName = (event) => {
        const { target: { value }} = event;
        this.setState(prevState => ({
            errors: Object.assign({}, prevState.errors, { name: !value ? 'Required' : ''})
        }));
        return !value ? 'Name Required' : '';
    };

    updateState = (event) => {
        const { target: { name, value }} = event;
        this.setState(prevState => ({
            formObject: Object.assign({}, prevState.formObject, {[name]: [value]}),
            disabled: Object.entries(prevState.errors).some(([key, value])=> value)
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const people = [...this.state.people, this.state.formObject];
        this.setState({
            people
        });
    };

    render() {
        return (
            <div className={'center-content'}>
                <form onSubmit={this.handleSubmit}>
                    <Field name="email" validate={this.validateEmail} updateState={this.updateState} placeholder="Email"/>
                    <Field name="name" validate={this.validateName} updateState={this.updateState}  placeholder="Name"/>
                    <input disabled={this.state.disabled} type='submit'/>
                </form>
                <ul>
                    {this.state.people.map(({name, email}, index) => <li key={index}>{name}, {email}</li>)}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Parent/>, document.getElementById('content'));
