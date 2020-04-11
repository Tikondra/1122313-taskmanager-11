export const renderDateShow = (isDateShowing, date, time) => {
  if (isDateShowing) {
    return (
      `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${date} ${time}"/>
         </label>
        </fieldset>`
    );
  } else {
    return ``;
  }
};
