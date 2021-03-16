import "./App.css";
import "@royalnavy/css-framework/dist/styles.css";
import { Button, CheckboxEnhanced, TextInput } from "./components/index.ts";
import { Fragment } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { withFormik } from "./enhancers/withFormik";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const SignupSchema = Yup.object().shape({
  firstName: Yup.string().matches(/[a-zA-Z]/, "please enter a valid first name")
    .min(2, "Please enter a name of 2 characters or more")
    .max(20, "Please enter a name of 20 characters or less")
    .required("Please enter a first name"),
  surName: Yup.string().matches(/[a-zA-Z]/, "please enter a valid surname")
  .min(2, "Please enter a  surname of 2 characters or more")
  .max(20, "Please enter a surname of 20 characters or less")
  .required("Please enter a surname"),
  telephone: Yup.string()
    .matches(phoneRegExp, "please enter a valid telephone number")
    .min(2, "please enter a telephone number of 2 or more digits")
    .max(15, "Please enter a telephone number of 15 digits or less")
    .required("Please enter a telephone number"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .max(250, "Email must be less than 250 characters")
    .required("Please enter an email address"),
});
const FormikTextInput = withFormik(TextInput);

function App() {
  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <h1>Test App</h1>
        </header>
      </div>

      <div className="form">
        <Formik
          initialValues={{
            firstName: "",
            email: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <form>
              <CheckboxEnhanced
                class="checkbox"
                variant="primary"
                data-cy="contacted-by-email"
                name="contacted-by-email"
                label="Would you like to be contacted by email?"
                value="true"
              />

              <CheckboxEnhanced
                variant="primary"
                data-cy="Contacted-by-telephone"
                name="Contacted-by-telephone"
                label="Would you like to be contacted by phone?"
                value="false"
                component={FormikTextInput}
              />

              <Field
                //autoFocus
                data-cy="first-name"
                name="firstName"
                label="First Name"
                component={FormikTextInput}
              />

              <Field
                name="surName"
                data-cy="surname"
                label="Surname"
                component={FormikTextInput}
              />

              <Field
                data-cy="email-field"
                name="email"
                label="email"
                type="email"
                onblur
                component={FormikTextInput}
              />

              <Field
                data-cy="telephone-number"
                name="telephone"
                label="Telephone number"
                type="tel"
                component={FormikTextInput}
              />
              <CheckboxEnhanced
                variant="primary"
                data-cy="Terms-and-Conditions"
                name="Terms-and-Conditions"
                label="Terms and Conditions"
                value="true"
                description="by checking this box you are agreeing to our terms and conditions"
              />
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
}

export default App;
