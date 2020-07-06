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

    if (name !== 'departmentSelect') {
      this.updateSelections(value);
      return
    }
    this.reintializeSelects(value);
  };

  reintializeSelects = (name) => {
    this.props.reFilterCourses(name);
  };

  componentWillReceiveProps(update) {
    const { courses } = update;
    if (courses.length === 0) {
      return;
    }
    const courseSelect = courses[0].name;
    this.updateSelections(courseSelect);
  }

  updateSelections(courseSelect) {
    const { departmentSelect, selections } = this.state;
    const selection = { departmentSelect, courseSelect };
    selections.push(selection);
    this.setState({
      courseSelect,
      selections
    });
  }

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
      },
    ],
    disabled: true
  };

  fetchDepartments = () => this.state.departmentsAndCourses.map(({ department}) => department);

  fetchCoursesForDepartment = (deptName) => {
    if (!deptName) {
      this.setState({
        courses: []
      });
      return;
    }
    setTimeout(() => {
      const courses = this.state.departmentsAndCourses.reduce((acc, element) => {
        if (element.department.name === deptName) {
          acc = acc.concat(element.courses);
        }
        return acc;
      }, []);
      this.setState({
        courses
      });
    },3000);
  };

  render() {
    return (
        <div className={'main-container'}>
          <CourseSelection departments={this.fetchDepartments()} courses={this.state.courses} reFilterCourses={this.fetchCoursesForDepartment}/>
          <input disabled={this.state.courses.length === 0} type='submit'/>
        </div>
    )
  }
}
ReactDOM.render(<Container/>, document.getElementById('content'));
