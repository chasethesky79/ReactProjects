class CourseSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departmentSelect: 1,
      courseSelect: 1
    };
  }

  componentDidMount() {
    this.reintializeSelects(this.state.departmentSelect);
  }

  handleChange = (event) => {
    const { target: { name, value }} = event;
    this.setState({
      [name]: [value]
    });
    if (!value) {
      this.setState({
        courses: []
      });
    }
    if (name === 'departmentSelect') {
      this.reintializeSelects(value);
    }
  };

  reintializeSelects = (name) => {
    this.props.reFilterCourses(name);
    this.setState((prevState, prevProps) => ({
      courseSelect: prevProps.courses[0]
    }));
  };

  render() {
    console.log(`COURSWS ${JSON.stringify(this.state.courses)}`);
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
          </div>
      )
    }
  }
}

class Container extends React.Component {

  state = {
    courses: [],
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
      }
    ],
    _loading: false
  };

  fetchDepartments = () => this.state.departmentsAndCourses.map(({ department}) => department);

  fetchCoursesForDepartment = (deptName) => {
    this.setState({
      _loading: true
    });
    const courses = this.state.departmentsAndCourses.reduce((acc, element) => {
      if (element.department.name === deptName) {
        acc = acc.concat(element.courses);
      }
      return acc;
    }, []);
    this.setState({
      courses
    });
    // apiClient(deptName).then(courses => {
    //   this.setState({
    //     courses,
    //     _loading: false
    //   })
    // });
  };

  render() {
    return (
        <div>
          <CourseSelection departments={this.fetchDepartments()} courses={this.state.courses} reFilterCourses={this.fetchCoursesForDepartment}/>
        </div>
    )
  }
}
ReactDOM.render(<Container/>, document.getElementById('content'));
