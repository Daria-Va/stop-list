import { useStopListStore } from "../store/useStopListStore";
import StopListItem from "./StopListItem";

export default function StopList() {
    const stopList = useStopListStore((s) => s.stopList);
    const total = useStopListStore((s) => s.menu.length);

    return (
        <div className="stop-list">
            <p className="stop-list__counter">
                В стоп-листе: <strong>{stopList.length}</strong> из {total}
            </p>

            {stopList.length === 0 ? (
                <p className="empty">Все позиции в продаже</p>
            ) : (
                <ul className="stop-list__items">
                    {stopList.map((entry) => (
                        <li key={entry.itemId}>
                            <StopListItem entry={entry} />
                        </li>
                    ))}
                </ul>
            )    
            }
        </div>
    );
}