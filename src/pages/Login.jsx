import { FormInput, SubmitBtn } from "../components";
import { Link, Form, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice.js";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/auth/login", data);
      store.dispatch(loginUser(response.data));
      toast.success(response.data.msg);
      return redirect("/");
    } catch (error) {
      toast.error(error.response.data.msg);
      return null;
    }
  };

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="Email"
          name="email"
          defaultValue="sample@gmail.com"
        />
        <FormInput
          type="password"
          label="Password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        <p className="text-center">
          Do not have an account?{" "}
          <Link to="/register" className="ml-2 link link-hover link-primary">
            Register
          </Link>{" "}
        </p>
        <p className="text-center">
          <Link to="/" className="ml-2 link link-hover link-primary">
            Back to home
          </Link>{" "}
        </p>
      </Form>
    </section>
  );
};

export default Login;
