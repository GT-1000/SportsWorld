import { BrowserRouter } from "react-router-dom";
import AppRouting from "./AppRouting";
import { AthleteProvider } from "./context/AthleteContext";

function App() {
  return (
    <BrowserRouter>
      <AthleteProvider>
        <AppRouting />
      </AthleteProvider>
    </BrowserRouter>
  );
}

export default App;