import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { region, city, category, name } = params;
  return (
    <Form className="bg-base-200 rounded-sm px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 items-center">
      <FormInput
        type="name"
        label="Izayotgan nomi"
        name="name"
        size="input-sm"
        defaultValue={name}
      />

      <FormSelect
        label="Viloyat"
        name="region"
        list={meta.region}
        size="select-sm"
        defaultValue={region}
      />
      <FormSelect
        label="Shahar"
        name="city"
        list={meta.city}
        size="select-sm"
        defaultValue={city}
      />
      <FormSelect
        label="Kategoriyalar"
        name="category"
        list={meta.category}
        size="select-sm"
        defaultValue={category}
      />

      <button type="submit" className="btn btn-primary btn-sm">
        Izlash
      </button>
      <Link to="/" className="btn btn-accent btn-sm">
        Qaytarish
      </Link>
    </Form>
  );
};

export default Filters;
