import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../../lib/api";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("required"),
  password: Yup.string().required("required")
});

export default function Login() {
  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Sign in</h2>
      <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await api.post("/auth/login", values);
            window.location.href = "/";
          } catch (err: any) {
            setErrors({ password: err.message || "Login failed" });
          } finally { setSubmitting(false); }
        }}>
        {({ isSubmitting, errors }) => (
          <Form className="space-y-3">
            <div>
              <label className="block text-sm">Email</label>
              <Field name="email" type="email" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm">Password</label>
              <Field name="password" type="password" className="w-full border p-2 rounded" />
            </div>
            <div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit" disabled={isSubmitting}>Sign in</button>
            </div>
            {errors.password && <div className="text-red-600">{(errors as any).password}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
