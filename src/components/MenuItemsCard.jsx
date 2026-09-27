import { useStopListStore } from "../store/useStopListStore";
import { formatPrice, getCategoryLabel } from "../utils/constants";

export default function MenuItemCard({ item }) {
    const openForm = useStopListStore((s) => s.openForm);
    const inStopList = useStopListStore((s) =>
        (s.stopList ?? []).some((e) => e.itemId === item.id)
    );

    return (
        <article className="card">
            <div className="card__body">
                <h3 className="card__name">{item.name}</h3>
                <span className="badge">{getCategoryLabel(item.category)}</span>
            </div>

            <div className="card__meta">
                <span className="card__price">{formatPrice(item.price)}</span>
                <span className="card__portions">Осталось: {item.portionsLeft} порц.</span>
            </div>

            <button
                type="button"
                className="btn btn--outline"
                onClick={() => openForm(item.id)}
                disabled={inStopList}
            >
                В стоп-лист
            </button>
        </article>
    );
}
