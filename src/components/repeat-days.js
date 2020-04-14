const getRepeatDay = (day, index, repeatingDays) => {
  const isChecked = repeatingDays[day];

  return (
    `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}-${index}"
      name="repeat"
      value="${day}"
      ${isChecked ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day}-${index}"
      >${day}</label>`
  );
};

export const createRepeatDays = (days, repeatingDays) => {
  return days
    .map((day, index) => getRepeatDay(day, index, repeatingDays)).join(`\n`);
};
