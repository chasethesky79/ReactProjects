class TimerForm extends React.Component {
    render() {
        const { title, project } = this.props;
        const submitText = title ? 'Update' : 'Create';
        return (
          <div className='ui centered card'>
              <div className='content'>
                  <div className='ui form'>
                      <div className='field'>
                          <label>Title</label>
                          <input type='text' defaultValue={title}/>
                      </div>
                      <div className='field'>
                          <label>Project</label>
                          <input type='text' defaultValue={project}/>
                      </div>
                      <div className='ui two bottom attached buttons'>
                          <button className='ui basic blue button'>{submitText}</button>
                          <button className='ui basic red button'>Cancel</button>
                      </div>
                  </div>
              </div>
          </div>
      );
    }
}
class ToggleableTimerForm extends React.Component {

    constructor() {
        super();
        this.state = {
            isOpen: false
        };
    }

    onOpenClicked = () => {
        this.setState({
            isOpen: true
        })
    };

    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm/>
            )
        } else {
            return (
                <div className='ui basic content center aligned segment'>
                    <button onClick={this.onOpenClicked} className='ui basic button icon'>
                        <i className='plus icon'/>
                    </button>
                </div>
            )
        }
    }
}
class Timer extends React.Component {
    constructor(props){
        super(props);
    }

    onEditClicked = () => {
        this.props.editClicked();
    };

    render() {
        const { elapsed, title, project, id } = this.props;
        const elapsedString = helpers.renderElapsedString(elapsed);
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='header'>
                        {title}
                    </div>
                    <div className='meta'>
                        {project}
                    </div>
                    <div className='center aligned description'>
                        <h2>{elapsedString}</h2>
                    </div>
                    <div className='extra content'>
                        <span className='right floated edit icon'>
                            <i onClick={this.onEditClicked} className='edit icon'/>
                        </span>
                        <span className='right floated edit icon'>
                            <i className='trash icon'/>
                        </span>
                    </div>
                </div>
                <div className='ui bottom attached basic blue button'>
                    Start
                </div>
            </div>
        )
    }
}
class EditableTimer extends React.Component {
    constructor() {
        super();
        this.state = {
            isEditMode: false
        };
    }

    onTimerEditClicked = () => {
      this.setState({
          isEditMode: true
      })
    };

    render() {
        const { title, project, elapsed, runningSince, id } = this.props;
        if (this.state.isEditMode) {
            return (
                <TimerForm title={title} project={project} id={id}/>
            );
        } else {
            return (
                <Timer title={title} project={project} elapsed={elapsed} runningSince={runningSince} id={id} editClicked={this.onTimerEditClicked}/>
            )
        }
    }
}
class EditableTimerList extends React.Component {

    render() {
        const { timers } = this.props;
        const result = timers.map(timer => {
            const { title, project, elapsed, runningSince, editFormOpen, id } = timer;
            return (
                <EditableTimer
                    id={id}
                    title={title}
                    project={project}
                    elapsed={elapsed}
                    runningSince={runningSince}
                    editFormOpen={editFormOpen}
                />
            )
        });
        return result;
    }
}

class TimersDashboard extends React.Component {

    constructor(){
        super();
        this.state = {
            timers: []
        }
    }

    componentDidMount() {
        this.setState({
            timers: [
                {
                    id: uuid.v4(),
                    title: 'Learn React',
                    project: 'Web Domination',
                    elapsed: '8986300',
                    runningSince: null
                },
                {
                    id: uuid.v4(),
                    title: 'Learn Extreme Ironing',
                    project: 'Web Domination',
                    elapsed: '3890985',
                    runningSince: null
                }
            ]
        });
    }

    render() {
        const { timers } = this.state;
        return (
            <div className='ui three centered grid'>
                <div className='column'>
                    <EditableTimerList timers={timers}/>
                    <ToggleableTimerForm/>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<TimersDashboard/>, document.getElementById('content'));
