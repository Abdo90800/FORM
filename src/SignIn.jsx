import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react"; // استيراد useState

function SignIn() {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    marketing_accept: false,
  };

  const loginSchema = Yup.object({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Required"),
  });

  return (
    <section className="bg-white flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => {
          const [showPassword, setShowPassword] = useState(false); // حالة لإظهار كلمة المرور
          const [showConfirmPassword, setShowConfirmPassword] = useState(false); // حالة لإظهار تأكيد كلمة المرور

          return (
            <Form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <Field
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <ErrorMessage name="firstname" component="div" className="text-red-600" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <Field
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <ErrorMessage name="lastname" component="div" className="text-red-600" />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <ErrorMessage name="email" component="div" className="text-red-600" />
              </div>

              <div className="col-span-6 sm:col-span-3 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type={showPassword ? "text" : "password"} // تغيير نوع الحقل بناءً على الحالة
                  id="password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // تغيير حالة الرؤية
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? "🙈" : "👁️"} {/* أيقونة العين */}
                </button>
                <ErrorMessage name="password" component="div" className="text-red-600" />
              </div>

              <div className="col-span-6 sm:col-span-3 relative">
                <label
                  htmlFor="confirmpassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Field
                  type={showConfirmPassword ? "text" : "password"} // تغيير نوع الحقل بناءً على الحالة
                  id="confirmpassword"
                  name="confirmpassword"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // تغيير حالة الرؤية
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? "🙈" : "👁️"} {/* أيقونة العين */}
                </button>
                <ErrorMessage name="confirmpassword" component="div" className="text-red-600" />
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <Field
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />
                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Create an account
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
}

export default SignIn;