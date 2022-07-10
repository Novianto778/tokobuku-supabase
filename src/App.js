import DashboardLayout from "layout/DashboardLayout";
import Router from "./constants/routes";

function App() {
  return (
    <>
      <DashboardLayout>
        <Router />
      </DashboardLayout>
    </>
  );
}

export default App;
