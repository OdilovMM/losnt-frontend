import { FormInput, SubmitBtn } from "../components";
import { Link, Form, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data)

  try {
    const response = await customFetch.post("/auth/register", data);
    console.log(response);
    toast.success(response.data.msg);
    return redirect("/login");
  } catch (error) {
    console.log(error.response.data.msg);
    toast.error(error.response.data.msg);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="Name" name="name"  />
        <FormInput type="number" label="Mobile" name="mobile" />
        <FormInput
          type="email"
          label="Email"
          name="email"
        />
        <FormInput
          type="password"
          label="Password"
          name="password"
        />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        <p className="text-center">
          ALready have an account?{" "}
          <Link to="/login" className="ml-2 link link-hover link-primary">
            Login
          </Link>{" "}
        </p>
        <p className="text-center">
          <Link
            to="/
          "
            className="ml-2 link link-hover link-primary"
          >
            Back to home
          </Link>{" "}
        </p>
      </Form>
    </section>
  );
};

export default Register;
