import { useMemo } from "react";
import { useStopListStore } from "../store/useStopListStore"
import MenuItemCard from "./MenuItemsCard";

export default function MenuList() {
    const menu = useStopListStore((s) => s.menu);
    const stopList = useStopListStore((s) => s.stopList);
    const search = useStopListStore((s) => s.search);
    const category = useStopListStore((s) => s.category);

    const visibleItems = useMemo(() => {
        const stoppedIds = new Set(stopList.map((e) => e.itemId));
        const query = search.trim().toLowerCase();

        return menu.filter(
            (item) =>
                !stoppedIds.has(item.id) &&
            (category === 'all' || item.category === category) &&
            item.name.toLowerCase().includes(query)
        );
    }, [menu, stopList, search, category]);

    if (visibleItems.length === 0) {
        return <p className="empty">Ничего не найдено</p>
    }

    return (
        <ul className="menu-list">
            {visibleItems.map((item) => (
                <li key={item.id}>
                    <MenuItemCard item={item} />
                </li>
            ))}
        </ul>
    );
}