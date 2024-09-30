import Header from "./components/Header/Header";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import QuizContainer from "./components/QuizContainer/QuizContainer";
import Progress from "./components/Progress/Progress";
import ResultPage from "./Pages/ResultPage/ResultPage";
import Quiz from "./Test";
export default function App() {
  return (
    <div className="app">
      <Header />
      <Main>
        <WelcomePage />
        {/* <Progress/> */}
        {/* <QuizContainer/> */}
        {/* <ResultPage/> */}
      </Main>
      <Footer />

      
    </div>
  );
}
