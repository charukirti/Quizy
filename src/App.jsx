import Header from "./components/Header/Header";
import WelcomePage from "./components/WelcomePage/WelcomePage";

import "./App.css";
import Footer from "./components/Footer/Footer";
export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <WelcomePage />
      </main>
      <Footer />
    </div>
  );
}
