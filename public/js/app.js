class TimerForm extends React.Component {

    state = {
        title: this.props.title || '',
        project: this.props.project || '',
        id: this.props.id || ''
    };

    handleSubmitClicked = () => {
        this.props.onSubmitClicked(this.state);
    };

    handleChangeEvent = (event) => {
        const { target: { name, value } } = event;
        this.setState(Object.assign({}, this.state, { [name]: value}));
    };

    render() {
        const submitText = this.props.id ? 'Update' : 'Create';
        return (
          <div className='ui centered card'>
              <div className='content'>
                  <div className='ui form'>
                      <div className='field'>
                          <label>Title</label>
                          <input type='text' name='title' value={this.state.title} onChange={this.handleChangeEvent}/>
                      </div>
                      <div className='field'>
                          <label>Project</label>
                          <input type='text' name='project' value={this.state.project} onChange={this.handleChangeEvent}/>
                      </div>
                      <div className='ui two bottom attached buttons'>
                          <button onClick={this.handleSubmitClicked} className='ui basic blue button'>{submitText}</button>
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

    handleFormSubmit = (timer) => {
        this.setState({
            isOpen: false
        });
        this.props.onTimerSubmitClicked(timer);
    }

    onOpenClicked = () => {
        this.setState({
            isOpen: true
        })
    };

    render() {
        if (this.state.isOpen) {
            return (
                <TimerForm onSubmitClicked={this.handleFormSubmit}/>
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
        this.state = {
            elapsed: null,
            runningSince: null,
            timerStarted: false
        }
    }

    onEditClicked = () => {
        this.props.editClicked();
    };

    onDeleteClicked = () => {
        this.props.onTimerDeleteClicked(this.props.id)
    };

    startTimer = () => {
        let elapsed = this.state.elapsed || this.props.elapsed;
        let runningSince = this.state.runningSince || this.props.runningSince;
        runningSince = elapsed;
        this.interval = setInterval(() => {
            elapsed = elapsed + 1000;
            this.setState({
                elapsed,
                runningSince,
                timerStarted: true
            })
        }, 1000)
    };

    stopTimer = () => {
        this.setState({
            timerStarted: false
        });
        if (this.interval) {
            clearInterval(this.interval)
        }
    };

    render() {
        const { title, project } = this.props;
        const elapsed = this.state.elapsed ? this.state.elapsed : this.props.elapsed;
        const elapsedString = helpers.renderElapsedString(elapsed);
        const timerBtnText = this.state.timerStarted ? 'Stop': 'Start';
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
                            <i onClick={this.onDeleteClicked} className='trash icon'/>
                        </span>
                    </div>
                </div>
                <div onClick={this.state.timerStarted ? this.stopTimer : this.startTimer} className='ui bottom attached basic blue button'>
                    {timerBtnText}
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

    handleSubmit = (timerObj) => {
        this.setState({
            isEditMode: false
        });
        this.props.onSubmitBtnClicked(timerObj);
    };

    handleDelete = (id) => {
        this.props.onDeleteBtnClicked(id)
    };

    render() {
        const { title, project, elapsed, runningSince, id } = this.props;
        if (this.state.isEditMode) {
            return (
                <TimerForm title={title} project={project} id={id} onSubmitClicked={this.handleSubmit}/>
            );
        } else {
            return (
                <Timer title={title} project={project} elapsed={elapsed} runningSince={runningSince} id={id} onTimerDeleteClicked={this.handleDelete} editClicked={this.onTimerEditClicked}/>
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
                    onSubmitBtnClicked={this.props.onTimerSubmitClicked}
                    onDeleteBtnClicked={this.props.onTimerDeleteClicked}
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

    handleSubmitEvent = (timerObj) => {
        const { id } = timerObj;
        const timers = !id ? this.state.timers.concat(helpers.newTimer(timerObj)) :
            this.state.timers.map(timer => timer.id === id ? Object.assign({}, timer, timerObj) : timer);
        this.setState({
            timers
        })
    };

    handleDeleteEvent = (id) => {
        const timers = this.state.timers.filter(timer => timer.id !== id);
        this.setState({
            timers
        })
    };

    componentDidMount() {
        client.getTimers().then(timers => {
            this.setState({
                timers
            })
        });
    }

    render() {
        const { timers } = this.state;
        return (
            <div className='ui three centered grid'>
                <div className='column'>
                    <EditableTimerList timers={timers} onTimerDeleteClicked = {this.handleDeleteEvent} onTimerSubmitClicked={this.handleSubmitEvent}/>
                    <ToggleableTimerForm isOpen={false} onTimerSubmitClicked={this.handleSubmitEvent}/>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<TimersDashboard/>, document.getElementById('content'));
