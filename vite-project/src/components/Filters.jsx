import { useStopListStore } from "../store/useStopListStore"
import { CATEGORIES } from "../utils/constants";

export default function Filters() {
    const search = useStopListStore((s) => s.search);
    const category = useStopListStore((s) => s.category);
    const setSearch = useStopListStore((s) => s.setSearch);
    const setCategory = useStopListStore((s) => s.setCategory);

    return (
        <div className="filters">
            <input
                type="search"
                className="input filters__search"
                placeholder="Поиск по названию"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Поиск по названию"
            />

            <div className="filters__tabs" role="tablist" aria-label="Катгории">
                {CATEGORIES.map((c) => (
                    <button
                        key={c.value}
                        type="button"
                        role="tab"
                        aria-selected={category === c.value}
                        className={`chip ${category === c.value ? 'chip--active' : ''}`}
                        onClick={() => setCategory(c.value)}
                    >
                        {c.label}
                    </button>
                ))}
            </div>
        </div>
    );
}