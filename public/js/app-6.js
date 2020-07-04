class CourseSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departmentSelect: 1,
      courseSelect: 1,
      _loading: false
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
    if (name === 'departmentSelect') {
      this.reintializeSelects(value);
    }
  };

  reintializeSelects = (deptId) => {
    this.props.reFilterCourses(deptId);
    this.setState((prevState, prevProps) => ({
      courseSelect: prevProps.courses[0]
    }));
  };

  render() {
    const departmentsTemplate = this.props.departments.map(v => (
        <option key={v.id} value={v.id}>{v.name}</option>
    ));
    const coursesTemplate = this.props.courses.map(c => (
        <option key={c.id} value={c.id}>{c.name}</option>
    ));
    return (
        <div>
        <label>Select a department</label>
        <select name='departmentSelect' value={this.state.departmentSelect} onChange={this.handleChange}>
          {departmentsTemplate}
        </select>
        <label>Courses</label>
        <select name='courseSelect' value={this.state.courseSelect} onChange={this.handleChange}>
          {coursesTemplate}
        </select>
        </div>
     )
  }
}

class Container extends React.Component {

  state = {
    courses: [],
    departmentsAndCourses :[
      {
        department : {
          id: 1,
          name: 'Core'
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
          name: 'Elective'
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
    ]
  };

  fetchDepartments = () => this.state.departmentsAndCourses.map(({ department}) => department);

  fetchCoursesForDepartment = (id) => {
    const courses = this.state.departmentsAndCourses.reduce((acc, element) => {
      if (element.department.id === Number(id)) {
        acc = acc.concat(element.courses);
      }
      return acc;
    }, []);
    this.setState({
      courses
    })
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
