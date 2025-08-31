import { useEffect, useState } from "react";
import axios from "axios";

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string;
};
const API_URL = import.meta.env.VITE_API_URL || "https://student-add-show.onrender.com";

const ShowSchools = () => {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    axios
    axios.get(`${API_URL}/api/schools`)
      .then((res) => setSchools(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold text-teal-700 mb-8 text-center">
        Schools Directory
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer"
          >
            <div className="h-52 w-full overflow-hidden">
              <img
                src={`http://localhost:5000${school.image}`}
                alt={school.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate">
                {school.name}
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold text-gray-800">Address:</span> {school.address}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-800">City:</span> {school.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchools;
