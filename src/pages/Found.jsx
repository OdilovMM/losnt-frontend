import { useRef } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import FormSelect from "../components/FormSelect";
import { FormInput } from "../components";
import { customFetch } from "../utils";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("Ilimos, akkauntingizga kiring");
    return redirect("/");
  }
  return null;
};

export const action = async ({ request }) => {
  const data = await request.formData();
  const formData = new FormData();


  data.forEach((value, key) => {
    formData.append(key, value);
  });

  try {
    const response = await customFetch.post("/items/add-item", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data.msg);
    return redirect("/");
  } catch (error) {
    toast.error(error.response?.data?.msg || error.message);
    return null;
  }
};

const Found = () => {
  const { landingData } = useLoaderData();
  const { meta } = landingData;

  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.target); // Use the form element itself to construct FormData

    try {
      const response = await customFetch.post("/items/add-item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.msg);
      formRef.current.reset();
      return redirect("/");
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    }
  };

  return (
    <form
      ref={formRef}
      className="p-6  rounded-lg shadow-md w-full max-w-2xl mx-auto"
      method="post"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          type="text"
          label="Topilgan buyum nomi"
          name="name"
          size="input-sm"
        />
        <div className="form-control">
          <label className="label">
            <span className="label-text ">Rasm</span>
          </label>
          <input
            type="file"
            className="input input-bordered w-full input-sm"
            name="photo"
            id="photo"
            accept="image"
          />
        </div>
        <FormSelect
          label="Viloyat"
          type="text"
          name="region"
          list={meta.region}
          size="select-sm"
        />
        <FormSelect
          label="Shahar"
          type="text"
          name="city"
          list={meta.city}
          size="select-sm"
        />
        <FormInput
          type="name"
          label="Topilgan ko'cha nomi"
          name="street"
          size="input-sm"
        />
        <FormSelect
          label="Kategoriya"
          type="text"
          name="category"
          list={meta.category}
          size="select-sm"
        />
        <FormInput
          type="name"
          label="Mo'ljal"
          name="orientation"
          size="input-sm"
        />
        <div className="form-control">
          <label className="label">
            <span className="label-text">Found Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full input-sm"
            name="foundDate"
          />
        </div>
        <FormInput
          type="text"
          label="Aloqa uchun telefon raqam"
          name="contactNumber"
          size="input-sm"
        />
      </div>

      <div className="mt-4">
        <button className="btn btn-primary w-full" type="submit">
          Qo'shish
        </button>
      </div>
    </form>
  );
};

export default Found;
