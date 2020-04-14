export const renderRepeatTask = (isRepeatingTask, repeatDays) => isRepeatingTask ?
  `<fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
      ${repeatDays}
    </div>
  </fieldset>` : ``;
