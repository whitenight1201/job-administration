import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";

import { toastNotification } from "../../components/Notification";
import { SIGNUP } from "../../graphql/index";
import { Variables, request } from "graphql-request";
import { IUser } from "../../types/user";

const PageSignUp: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: IUser = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const register = useMutation(
    (variables: Variables) => {
      return request("http://localhost:5000/graphql", SIGNUP, variables);
    },
    {
      onSuccess: () => {
        toastNotification("SignUp Success", "success", 3000);
        navigate("/login");
      },
      onError: (err: any) => {
        err.response.errors.forEach((error: any) =>
          toastNotification(error.message, "error", 3000)
        );
      },
    }
  );

  const handleRegister = async (formValue: IUser) => {
    const { name, email, password } = formValue;
    console.log(password);
    await register.mutateAsync({ name, email, password });
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="flex flex-col w-[600px] h-[500px] shadow-lg rounded-lg p-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            <div className="flex flex-col w-full h-28 gap-y-2">
              <label htmlFor="name">User Name</label>
              <Field
                name="name"
                type="text"
                className="h-10 px-2 border border-gray-300 rounded-md focus:border-primary outline-none"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm w-full text-red-500"
              />
            </div>
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
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="h-12 rounded-md bg-indigo-400 hover:bg-indigo-500 text-xl py-2 px-10"
              >
                Sign Up
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PageSignUp;
