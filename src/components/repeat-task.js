export const renderRepeatTask = (isRepeatingTask, repeatDays) => {
  if (isRepeatingTask) {
    return (
      `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${repeatDays}
        </div>
      </fieldset>`
    );
  } else {
    return ``;
  }
};
