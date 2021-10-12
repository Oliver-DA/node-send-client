import React, { useEffect} from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/auth/authContext';
import Alert from '../components/Alert';
import { useRouter } from 'next/router';

const LogIn = () => {

  const { logIn, message, authenticated } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if(authenticated) {
      router.push("/")
    }
  }, [authenticated])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "" 
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required")
    }),

    onSubmit: (values) => {
      logIn(values)
    }
  });

  return (
    <Layout>
      <div className="md:w-4/5 xl:w3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          LogIn
        </h2>
        { message && <Alert message = {message} />}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">

            <form 
              onSubmit = {formik.handleSubmit} 
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            >

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
                value = "LogIn"
              />

            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
 
export default LogIn;