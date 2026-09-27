import Filters from "./components/Filters";
import MenuList from "./components/MenuList";
import StopList from "./components/StopList";
import StopListForm from "./components/StopListForm";

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Управление стоп-листом</h1>
      </header>

      <main className="app__layout">
        <section className="panel panel--menu" aria-labelledby="menu-title">
          <h2 id="menu-title" className="panel__title">Меню</h2>
          <Filters />
          <MenuList />
        </section>

        <section className="panel panel--stop" aria-labelledby="stop-title">
          <h2 id="stop-title" className="panel__title">Стоп-лист</h2>
          <StopList />
        </section>
      </main>

      <StopListForm />
    </div>
  );
}