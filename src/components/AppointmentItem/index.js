import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onIsStarredChange} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickStartButton = () => {
    onIsStarredChange(id)
  }

  return (
    <li className="appointment-container">
      <div className="appointment-title-container">
        <p className="appointment-title">{title}</p>
        <button
          type="button"
          className="start-button"
          testid="star"
          onClick={onClickStartButton}
        >
          {isStarred ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              alt="star"
              className="start-icon"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              alt="star"
              className="start-icon"
            />
          )}
        </button>
      </div>
      <p className="appointment-date">{date}</p>
    </li>
  )
}

export default AppointmentItem
