
export const COMMENT_MAX = 200;
export const COMMENT_MIN_OTHER = 10;

export function isValidTime(value) {
  if (!value) return false;
  const match = value.match(/^(\d{2}):(\d{2})$/);
  if (!match) return false;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

/** Проверка одного поля. Возвращает текст ошибки или ''. */
export function validateField(name, values) {
  switch (name) {
    case 'reason':
      return values.reason ? '' : 'Выберите причину';

    case 'comment': {
      const comment = values.comment.trim();
      if (comment.length > COMMENT_MAX) {
        return `Максимум ${COMMENT_MAX} символов`;
      }
      if (values.reason === 'other' && comment.length < COMMENT_MIN_OTHER) {
        return `Для причины «Другое» комментарий обязателен (минимум ${COMMENT_MIN_OTHER} символов)`;
      }
      return '';
    }

    case 'returnAt':
      if (!values.returnAt) return 'Укажите время возврата';
      return isValidTime(values.returnAt) ? '' : 'Формат времени — ЧЧ:ММ';

    default:
      return '';
  }
}

/** Проверка всей формы. Возвращает объект { поле: ошибка } только с ошибками. */
export function validateStopListForm(values) {
  const errors = {};
  ['reason', 'comment', 'returnAt'].forEach((field) => {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  });
  return errors;
}