import { useEffect, useState } from "react";
import { useStopListStore } from "../store/useStopListStore";
import { REASONS } from "../utils/constants";
import {
  COMMENT_MAX,
  validateField,
  validateStopListForm,
} from '../utils/validation.js';

const INITIAL_VALUES = { reason: '', comment: '', returnAt: '' };

export default function StopListForm() {
    const activeItemId = useStopListStore((s) => s.activeItemId);
    const menu = useStopListStore((s) => s.menu);
    const closeForm = useStopListStore((s) => s.closeForm);
    const addToStopList = useStopListStore((s) => s.addToStopList);
    const isInStopList = useStopListStore((s) => s.isInStopList);

    const [values, setValues] = useState(INITIAL_VALUES);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const item = menu.find((m) => m.id === activeItemId);

    useEffect(() => {
        setValues(INITIAL_VALUES);
        setErrors({});
        setSubmitting(false);
    }, [activeItemId]);

    useEffect(() => {
        if (!item) return;
        const onKey = (e) => e.key === 'Escape' && !submitting && closeForm();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [item, submitting, closeForm]);

    if (!item) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        const next = { ...values, [name]: value };
        setValues(next);
        setErrors((prev) => {
            const updated = { ...prev };
            if (prev[name]) updated[name] = validateField(name, next);

            if (name === 'reason' && prev.comment) {
                updated.comment = validateField('comment', next);
            }
            Object.keys(updated).forEach((k) => !updated[k] && delete updated[k]);
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateStopListForm(values);
        if (isInStopList(item.id)) {
            formErrors.form = 'Эта позиция уже в стоп-листе';
        }
        setErrors(formErrors);
        if (Object.keys(formErrors).length > 0) return;

        setSubmitting(true);
        
        setTimeout(() => {
            addToStopList({ itemId: item.id, ...values });
        }, 500);
    };

    const commentLength = values.comment.trim().length;

    return (
        <div 
            className="modal"
            onMouseDown={(e) => e.target === e.currentTarget && !submitting && closeForm()}
        >
            <form 
                className="modal__dialog form"
                onSubmit={handleSubmit}
                noValidate
                role="dialog"
                aria-modal="true"
                aria-labelledby="form-title"
            >
                <h2 id="form-title" className="form__title">В стоп-лист</h2>
                <p className="form__subtitle">{item.name}</p>

                {/* Причина */}
                <div className="form__field">
                    <label htmlFor="reason" className="form__label">Причина *</label>
                    <select 
                        id="reason"
                        name="reason"
                        className={`input ${errors.reason ? 'input--error' : ''}`}
                        value={values.reason}
                        onChange={handleChange}
                    >
                        <option value="">- выберите причину -</option>
                        {REASONS.map((r) => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                    </select>
                    {errors.reason && <p className="form__error">{errors.reason}</p>}
                </div>

                {/* Комментарий */}
                <div className="form__field">
                    <label htmlFor="comment" className="form_label">
                        Комментарий{values.reason === 'other' ? ' *' : ''}
                    </label>
                    <textarea 
                        id="comment"
                        name="comment"
                        rows={3}
                        className={`input ${errors.comment ? 'input--error' : ''}`}
                        value={values.comment}
                        onChange={handleChange}
                        placeholder="Например: поставка ожижается вечером"
                    />
                    <div className="form__hint-row">
                        {errors.comment ? (
                            <p className="form__error">{errors.comment}</p>
                        ) : (
                            <span />
                        )}
                        <span className={`form__counter ${commentLength > COMMENT_MAX ? 'form__counter--over' : ''}`}>
                            {commentLength}/{COMMENT_MAX}
                        </span>
                    </div>
                </div>

                {/* Время возврата */}
                <div className="form__field">
                    <label htmlFor="returnAt" className="form__label">Время возврата *</label>
                    <input 
                        id="returnAt"
                        name="returnAt"
                        type="time"
                        className={`input ${errors.returnAt ? 'input--error' : ''}`}
                        value={values.returnAt}
                        onChange={handleChange}
                    />
                    {errors.returnAt && <p className="form__error">{errors.returnAt}</p>}
                </div>

                {errors.form && <p className="form__error form__error--block">{errors.form}</p>}

                <div className="form__actions">
                    <button type="button" className="btn btn--ghost" onClick={closeForm} disabled={submitting}>
                        Отмена
                    </button>
                    <button type="submit" className="btn btn--primary" disabled={submitting}>
                        {submitting ? (
                            <>
                            <span className="spinner" aria-hidden="true" /> Сохраняем...
                            </>
                        ) : (
                            'Отправить в стоп-лист'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}