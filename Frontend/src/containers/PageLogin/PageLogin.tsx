import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useMutation } from "react-query";
import { toastNotification } from "../../components/Notification";
import { LOGIN } from "../../graphql/index";
import { Variables, request } from "graphql-request";

const PageLogin: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<String>("");
  const initialValues: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required!")
      .email("This is not a valid email."),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const login = useMutation(
    (variables: Variables) => {
      return request("http://localhost:5000/graphql", LOGIN, variables);
    },
    {
      onSuccess: (data: any) => {
        localStorage.setItem("token", data.signIn);
        toastNotification("Login Success", "success", 3000);
        navigate("/");
      },
      onError: (err: any) => {
        err.response.errors.forEach((error: any) =>
          toastNotification(error.message, "error", 3000)
        );
      },
    }
  );

  const handleLogin = async (formValue: {
    email: string;
    password: string;
  }) => {
    const { email, password } = formValue;
    await login.mutateAsync({ email, password, role });
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex flex-col justify-center w-[600px] h-[500px] shadow-lg rounded-lg p-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="flex flex-col w-full h-28 gap-y-2">
              <label htmlFor="email">User Email</label>
              <Field
                name="email"
                type="text"
                className="h-10 px-2 border border-gray-300 rounded-md focus:border-primary outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm w-full text-red-500"
              />
            </div>

            <div className="flex flex-col w-full h-28 gap-y-2">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className="h-10 px-2 border border-gray-300 rounded-md focus:border-primary outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm w-full text-red-500"
              />
            </div>
            <div className="flex justify-center gap-6 bottom-0">
              <button
                type="submit"
                className="h-12 rounded-md bg-indigo-400 hover:bg-indigo-500 text-xl p-2"
                onClick={(e) => setRole("isadmin")}
              >
                Login as Host
              </button>
              <button
                type="submit"
                className="h-12 rounded-md bg-indigo-400 hover:bg-indigo-500 text-xl p-2"
                onClick={(e) => setRole("isguest")}
              >
                Login as Guest
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PageLogin;
