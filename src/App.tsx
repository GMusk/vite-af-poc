import { QueryClient, QueryClientProvider } from "react-query";
import AgGridTable from "./AgGridTable";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AgGridTable />
    </QueryClientProvider>
  );
}

export default App;
