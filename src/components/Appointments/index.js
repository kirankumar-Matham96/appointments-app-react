import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isStarredSelected: false}

  onTitleInputChange = event => {
    this.setState({title: event.target.value})
  }

  onDateInputChange = event => {
    this.setState({date: event.target.value})
  }

  onAddingAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onIsStarredChange = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {
            ...eachAppointment,
            isStarred: !eachAppointment.isStarred,
          }
        }
        return eachAppointment
      }),
    }))
  }

  onSelectStarredAppointments = () => {
    this.setState(prevState => ({
      isStarredSelected: !prevState.isStarredSelected,
    }))
  }

  render() {
    const {title, date, appointmentsList, isStarredSelected} = this.state
    const filteredList = !isStarredSelected
      ? appointmentsList
      : appointmentsList.filter(
          eachAppointment => eachAppointment.isStarred === true,
        )

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="add-appointment-container">
            <div className="form-container">
              <form className="form">
                <h1 className="main-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="title-input"
                  placeholder="Title"
                  value={title}
                  onChange={this.onTitleInputChange}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="date-input"
                  value={date}
                  onChange={this.onDateInputChange}
                />
                <button
                  className="add-button"
                  type="submit"
                  onClick={this.onAddingAppointment}
                >
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="appointments-container">
            <div className="appointments-header">
              <h1 className="appointments-title">Appointments</h1>
              <button
                type="button"
                className="starred-button"
                onClick={this.onSelectStarredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-items-container">
              {filteredList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  onIsStarredChange={this.onIsStarredChange}
                  key={eachAppointment.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
