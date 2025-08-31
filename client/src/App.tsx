import { useState } from "react";
import AddSchool from "./component/AddSchool";
import ShowSchools from "./component/ShowSchools";


function App() {
  const [page, setPage] = useState<"add" | "show">("add");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-teal-600 text-white p-4 flex justify-around">
        <button onClick={() => setPage("add")} className="font-bold">Add School</button>
        <button onClick={() => setPage("show")} className="font-bold">Show Schools</button>
      </nav>

      {page === "add" ? <AddSchool /> : <ShowSchools />}
    </div>
  );
}

export default App;
