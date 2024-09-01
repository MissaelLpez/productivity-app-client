import ToggleTheme from "./components/ToggleTheme";
import { Card } from "./components/ui/card";

const App = () => {
  return (
    <div className="p-5 h-screen bg-white dark:bg-dark transition-colors duration-500 ease-in-out">
      <header className="flex justify-between">
        <h1 className="text-dark dark:text-white font-bold text-xl">
          Productivity App
        </h1>
        <ToggleTheme />
      </header>

      <main>
        <Card className="w-1/2 p-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
          accusamus facere perferendis ut numquam dolor alias qui, ad assumenda
          laudantium ratione accusantium corrupti nihil quis minima incidunt
          velit nisi corporis?
        </Card>
      </main>
    </div>
  );
};

export default App;
