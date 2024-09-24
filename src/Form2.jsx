import "./App.css";
import {
  useFormik,
  FormikProvider,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
} from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  PhoneNumber: Yup.array().of(
    Yup.string().required("Phone number is required")
  ),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip: Yup.string().required("ZIP code is required"),
  country: Yup.string().required("Country is required"),
  Address: Yup.array().of(
    Yup.object({
      subAddress: Yup.string().required("Sub-address is required"),
    })
  ),
  birthDate: Yup.date().required("Birth date is required"),
  gender: Yup.string().required("Gender is required"),
});

const initialValues = {
  name: "",
  PhoneNumber: [""],
  city: "",
  state: "",
  zip: "",
  country: "",
  Address: [{ subAddress: "" }],
  birthDate: "",
  gender: "",
};

const onSubmit = (values) => {
  console.log("Form data", values);
};

function Form2() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <section className="container">
        <header>Registration Form</header>
        <Form className="form" action="#">
          <div className="input-box">
            <label>Full Name</label>
            <Field
              required
              placeholder="Enter full name"
              type="text"
              name="name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="input-box phone-number">
            <label>Phone Numbers</label>
            <FieldArray name="PhoneNumber">
              {({ remove, push }) => (
                <>
                  {formik.values.PhoneNumber.map((phoneNumber, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Field
                        name={`PhoneNumber[${index}]`}
                        required
                        placeholder="Enter phone number"
                        type="tel"
                      />
                      <ErrorMessage
                        name={`PhoneNumber[${index}]`}
                        component="div"
                        className="text-red-500"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push("")}
                    className="px-2 py-1 mt-2 text-white bg-green-500 rounded"
                  >
                    Add Phone Number
                  </button>
                </>
              )}
            </FieldArray>
            <ErrorMessage
              name="PhoneNumber"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="column">
            <div className="input-box">
              <label>Birth Date</label>
              <Field
                required
                placeholder="Enter birth date"
                type="date"
                name="birthDate"
              />
              <ErrorMessage
                name="birthDate"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>

          <div className="gender-box">
            <label>Gender</label>
            <div className="gender-option">
              <div className="gender">
                <Field
                  name="gender"
                  id="check-male"
                  type="radio"
                  value="Male"
                />
                <label htmlFor="check-male">Male</label>
              </div>

              <div className="gender">
                <Field
                  name="gender"
                  id="check-female"
                  type="radio"
                  value="Female"
                />
                <label htmlFor="check-female">Female</label>
              </div>

              <div className="gender">
                <Field
                  name="gender"
                  id="check-other"
                  type="radio"
                  value="Other"
                />
                <label htmlFor="check-other">Prefer not to say</label>
              </div>
            </div>
            <ErrorMessage
              name="gender"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="input-box address">
            <label>Address</label>
            <FieldArray name="Address">
              {({ remove, push }) => (
                <>
                  {formik.values.Address.map((address, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Field
                        name={`Address[${index}].subAddress`}
                        required
                        placeholder="Enter street address"
                        type="text"
                      />
                      <ErrorMessage
                        name={`Address[${index}].subAddress`}
                        component="div"
                        className="text-red-500"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ subAddress: "" })} // إ
                    className="px-2 py-1 mt-2 text-white bg-green-500 rounded"
                  >
                    Add Address
                  </button>
                </>
              )}
            </FieldArray>
            <ErrorMessage
              name="Address"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="column">
            <div className="select-box">
              <Field name="country" as="select">
                <option hidden>Country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
              </Field>
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                name="city"
                required
                placeholder="Enter your city"
                type="text"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </Form>
      </section>
    </FormikProvider>
  );
}

export default Form2;
