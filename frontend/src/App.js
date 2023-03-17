import "./App.css";
import MainLayout from "./layouys/MainLayout";
import { message } from "antd";
import { MesContextHolder } from "./components/Context";

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MesContextHolder.Provider value={messageApi}>
      {contextHolder}
      <MainLayout />
    </MesContextHolder.Provider>
  );
}

export default App;
