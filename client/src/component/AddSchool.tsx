import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';


type FormData = {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
};

const API_URL = import.meta.env.VITE_API_URL || "https://student-add-show.onrender.com";

const AddSchool = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const [message, setMessage] = useState("")


  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value.length > 0) {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      await axios.post(`${API_URL}/api/schools`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("School added successfully!");

      reset()
    } catch (err) {
      console.error(err);
      setMessage("Error adding school.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-teal-700 mb-6 text-center">
          Add New School
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/** Name */}
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">School Name</label>
            <input
              {...register("name", { required: true })}
              placeholder="Enter school name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            {errors.name && <p className="text-red-500 mt-1 text-sm">Name is required</p>}
          </div>

          {/** Address */}
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">Address</label>
            <input
              {...register("address", { required: true })}
              placeholder="Enter address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            {errors.address && <p className="text-red-500 mt-1 text-sm">Address is required</p>}
          </div>

          {/** City + State in grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">City</label>
              <input
                {...register("city", { required: true })}
                placeholder="City"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.city && <p className="text-red-500 mt-1 text-sm">City is required</p>}
            </div>
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">State</label>
              <input
                {...register("state", { required: true })}
                placeholder="State"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.state && <p className="text-red-500 mt-1 text-sm">State is required</p>}
            </div>
          </div>

          {/** Contact + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Contact</label>
              <input
                {...register("contact", { required: true })}
                placeholder="Contact number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.contact && <p className="text-red-500 mt-1 text-sm">Contact is required</p>}
            </div>
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Email</label>
              <input
                {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })}
                placeholder="Email address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              {errors.email_id && <p className="text-red-500 mt-1 text-sm">Valid email is required</p>}
            </div>
          </div>

          {/** Image Upload */}
          <div>
            <label className="font-semibold text-gray-700 mb-1 block">School Image</label>
            <input
              type="file"
              {...register("image")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/** Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition duration-300"
          >
            Add School
          </button>
        </form>

        {message && (
          <p className={`mt-6 text-center font-semibold ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};





export default AddSchool