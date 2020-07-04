class CourseSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departmentSelected: 1
    };
  }

  componentDidMount() {
    this.props.reFilterCourses(this.state.departmentSelected);
  }

  handleChange = (event) => {
    const { target: { value: departmentSelected }} = event;
    this.setState({
      departmentSelected
    });
    this.props.reFilterCourses(departmentSelected)
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
        <select value={this.state.departmentSelected} onChange={this.handleChange}>
          {departmentsTemplate}
        </select>
          <label>Courses</label>
          <select>
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
