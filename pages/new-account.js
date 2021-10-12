import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/auth/authContext';
import Alert from '../components/Alert';
import { useRouter } from 'next/router';

const NewAccount = () => {

  const {signUp } = useAuth();
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 character long").required("Password is required")
    }),

    onSubmit: (values) => {
      signUp(values);
      router.push("/login")
    }
  });

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Create Account
        </h2>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">

            <form 
              onSubmit = {formik.handleSubmit} 
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            >

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="name"
                >Name
                </label>

                { formik.touched.name && formik.errors.name ? (
                  <div className = "my-2 bg-gray-100 border-l-4 border-red-500 text-red-700 p-2">
                    <p>{formik.errors.name}</p>
                  </div>
                ): null }

                <input
                  className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  id="name"
                  value = {formik.values.name}
                  onChange = {formik.handleChange}
                />
              </div>

              { formik.touched.email && formik.errors.email ? (
                  <div className = "my-2 bg-gray-100 border-l-4 border-red-500 text-red-700 p-2">
                    <p>{formik.errors.email}</p>
                  </div>
                ): null }

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="email"
                >Email
                </label>
                <input
                  className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  id="email"
                  value = {formik.values.email}
                  onChange = {formik.handleChange}
                />
              </div>

              { formik.touched.password && formik.errors.password ? (
                  <div className = "my-2 bg-gray-100 border-l-4 border-red-500 text-red-700 p-2">
                    <p>{formik.errors.password}</p>
                  </div>
                ): null }

              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="password"
                >Password
                </label>
                <input
                  className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                  value = {formik.values.password}
                  onChange = {formik.handleChange}
                />
              </div>

              <input 
                type = "submit"
                className = "bg-pink-600 hover:bg-gray-900 cursor-pointer w-full p-2 text-white font-bold upppercase"
                value = "Create Account"
              />

            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
 
export default NewAccount;