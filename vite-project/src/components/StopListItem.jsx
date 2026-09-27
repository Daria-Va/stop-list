import { useStopListStore } from "../store/useStopListStore";
import { getReasonLabel } from "../utils/constants";

export default function StopListItem({ entry }) {
    const item = useStopListStore((s) => s.menu.find((m) => m.id === entry.itemId));
    const returnToMenu = useStopListStore((s) => s.returnToMenu);

    if (!item) return null;

    return (
        <article className="stop-item">
            <div className="stop-item__head">
                <h3 className="stop-item__name">{item.name}</h3>
                <span className="badge badge--danger">{getReasonLabel(entry.reason)}</span>
            </div>

            {entry.comment && <p className="stop-item__comment">{entry.comment}</p>}

            <div className="stop-item__footer">
                <span className="stop-item__return">Вернется в {entry.returnAt}</span>
                <button
                    type="button"
                    className="btn btn--outline btn--small"
                    onClick={() => returnToMenu(entry.itemId)}
                >
                    Вернуть в меню
                </button>
            </div>
        </article>
    );
}