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
        const { target: { name, value }} = event;
        const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!re.test(value)) {
            const errors = Object.assign({}, this.state.errors.email, { email: 'Invalid Email'});
            this.setState({
                errors,
                disabled: true
            });
            return 'Invalid Email'
        }
    };

    validateName = (event) => {
        const { target: { name, value }} = event;
        let errors, formObject;
        if (!value) {
            errors = Object.assign({}, this.state.errors.name, { name: 'Required'});
            this.setState({
                errors,
                disabled: true
            });
            return 'Name Required';
        }
    };

    updateState = (event) => {
        const { target: { name, value }} = event;
        const formObject = Object.assign({}, this.state.formObject, {[name]: [value]});
        const errors = Object.assign({}, this.state.errors, { [name]: ''});
        const disabled = Object.entries(errors).some(([value])=> value);
        this.setState({
            formObject,
            errors,
            disabled
        });
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
