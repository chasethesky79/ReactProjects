class Field extends React.Component {

    state = {
        value:'',
        error: ''
    };

    onChange = (event) => {
        const { value, name } = event.target;
        const error = this.props.validate ? this.props.validate(value) : '';
        this.setState({
            value,
            error
        });
        this.props.onChange({ name, value, error});
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
            nameError: 'Required',
            emailError: 'Required'
        },
        disabled: true
    };
    validateEmail = (email) => {
        const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        let errors, formObject;
        if (!re.test(email)) {
            errors = Object.assign({}, this.state.errors.email, { email: 'Invalid Email'});
            this.setState({
                errors,
                disabled: true
            });
            return 'Invalid Email'
        }
        const { name } = this.state.formObject;
        const { nameError } = this.state.errors;
        formObject = Object.assign({}, this.state.formObject, { name, email } );
        errors = Object.assign({}, this.state.errors, { emailError: '', nameError});
        const disabled = this.state.errors.nameError;
        this.setState({
            formObject,
            errors,
            disabled
        });
    };

    validateName = (name) => {
        let errors, formObject;
        if (!name) {
            errors = Object.assign({}, this.state.errors.name, { name: 'Required'});
            this.setState({
                errors,
                disabled: true
            });
            return 'Name Required';
        }
        const { email } = this.state.formObject;
        const { emailError } = this.state.errors;
        formObject = Object.assign({}, this.state.formObject, { name, email } );
        errors = Object.assign({}, this.state.errors, { nameError: '', emailError });
        const disabled = this.state.errors.emailError;
        this.setState({
            formObject,
            errors,
            disabled
        });
    };

    handleChange = ({name ,value, error}) => {

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
                    <Field name="email" validate={this.validateEmail} onChange={this.handleChange} placeholder="Email"/>
                    <Field name="name" validate={this.validateName} onChange={this.handleChange} placeholder="Name"/>
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
