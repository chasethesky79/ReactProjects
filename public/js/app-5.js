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

class CourseSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            departmentSelect: '',
            courseSelect: '',
            selections: []
        }
    }

    handleChange = (event) => {
        const { target: { name, value }} = event;
        this.setState({
            [name]: value
        });
        this.props.updateState(event);
    };

    render() {
        const departmentsTemplate = this.props.departments.map(v => (
            <option key={v.id} value={v.name}>{v.name}</option>
        ));
        const coursesTemplate = this.props.courses.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
        ));
        if (this.props.courses.length  === 0) {
            return (
                <div className={'department-course-select'}>
                    <div className={'item-select'}>
                        <label>Select a department</label>
                        <select name='departmentSelect' value={this.state.departmentSelect} onChange={this.handleChange}>
                            {departmentsTemplate}
                        </select>
                        <span style= {{color:'red'}}>{this.state.error}</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={'department-course-select'}>
                    <div className={'item-select'}>
                        <label>Select a department</label>
                        <select name='departmentSelect' value={this.state.departmentSelect} onChange={this.handleChange}>
                            {departmentsTemplate}
                        </select>
                    </div>
                    <div className={'item-select'}>
                        <label>Courses</label>
                        <select name='courseSelect' value={this.state.courseSelect} onChange={this.handleChange}>
                            {coursesTemplate}
                        </select>
                    </div>
                    <span style= {{color:'red'}}>{this.state.error}</span>
                    <ul>
                        {this.state.selections.map(({departmentSelect, courseSelect}, index) => <li key={index}>{departmentSelect}, {courseSelect}</li>)}
                    </ul>
                </div>
            )
        }
    }
}

class Parent extends React.Component {

    state = {
        formObject: {
            name: '',
            email:'',
            departmentSelect: '',
            courseSelect: ''
        },
        people : [],
        errors: {
            name: 'Required',
            email: 'Required'
        },
        courses: [],
        _loading: false,
        departmentsAndCourses :[
            {
                department: {
                    id: null,
                    name: ''
                },
                courses:[],
            },
            {
                department : {
                    id: 1,
                    name: 'core'
                },
                courses: [{
                    id: 1,
                    name: 'learnyouncode'
                },
                    {
                        id: 2,
                        name: 'stream-adventure'
                    }]
            },
            {
                department: {
                    id: 2,
                    name: 'electives'
                },
                courses: [{
                    id: 3,
                    name: 'Functional JavaScript'
                },
                    {
                        id: 4,
                        name: 'Shader School'
                    }]
            },
        ],
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
            formObject: Object.assign({}, prevState.formObject, {[name]: value}),
        }));

        if (name === 'departmentSelect') {
            this.populateCoursesForDepartment(value);
        }
    };

    fetchDepartments = () => this.state.departmentsAndCourses.map(({ department}) => department);

    populateCoursesForDepartment = (deptName) => {
        this.setState({
            _loading: true
        });
        setTimeout(() => {
            const courses = !deptName ? [] : this.state.departmentsAndCourses.reduce((acc, element) => {
                if (element.department.name === deptName) {
                    acc = acc.concat(element.courses);
                }
                return acc;
            }, []);
            const disabled = !deptName ? true : Object.entries(this.state.errors).some(([key, value])=> value);
            this.setState(() => ({
                courses,
                disabled,
                formObject: Object.assign({}, this.state.formObject, { courseSelect: courses.length === 0 ? '' : courses[0].name }),
                _loading: false
            }))
        }, 3000);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const people = [...this.state.people, this.state.formObject];
        this.setState({
            people
        });
        client.savePeople(people).then(people => this.setState({
            people
        }));
    };

    componentWillMount() {
        client.loadPeople().then(people => {
            this.setState({
                people
            })
        });
    };

    render() {
        if (!this.state.people || this.state.people.length === 0) {
            return (<div className={'center-content'}>
                <form onSubmit={this.handleSubmit}>
                    <Field name="email" validate={this.validateEmail} updateState={this.updateState}
                           placeholder="Email"/>
                    <Field name="name" validate={this.validateName} updateState={this.updateState} placeholder="Name"/>
                    <CourseSelection departments={this.fetchDepartments()} updateState={this.updateState}
                                     courses={this.state.courses}/>
                    <input disabled={this.state.disabled} type='submit'/>
                </form>
            </div>);
        }
        return (
            <div className={'center-content'}>
                <form onSubmit={this.handleSubmit}>
                    <Field name="email" validate={this.validateEmail} updateState={this.updateState} placeholder="Email"/>
                    <Field name="name" validate={this.validateName} updateState={this.updateState}  placeholder="Name"/>
                    <CourseSelection departments={this.fetchDepartments()} updateState={this.updateState} courses={this.state.courses}/>
                    <input disabled={this.state.disabled} type='submit'/>
                </form>
                <ul>
                    {this.state.people.map(({ name, email, departmentSelect, courseSelect }, index) => <li key={index}>{name}, {email}, {departmentSelect}, {courseSelect}</li>)}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Parent/>, document.getElementById('content'));
