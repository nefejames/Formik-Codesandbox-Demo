import Head from "next/head";
import { Form, Field, ErrorMessage, withFormik } from "formik";
import * as Yup from "yup";

import styles from "../styles/styles.module.scss";

const App = ({ values }) => (
  <div className={styles.container}>
    <Head>
      <title>Formik Form</title>
    </Head>
    <Form>
      <div className={styles.formRow}>
        <label htmlFor="email">Email</label>
        <Field type="email" name="email" id="email" />
        <ErrorMessage name="email" component="span" className={styles.error} />
      </div>
      <div className={styles.formRow}>
        <label htmlFor="email">Select a color to continue</label>
        <Field component="select" name="select">
          <option value="" label="Select a color" />
          <option value="red" label="red" />
          <option value="blue" label="blue" />
          <option value="green" label="green" />
        </Field>
        <ErrorMessage name="select" component="span" className={styles.error} />
      </div>

      <div className={styles.formRow}>
        <label htmlFor="checkbox">
          <Field type="checkbox" name="checkbox" checked={values.checkbox} />
          Accept Terms & Conditions
        </label>
        <ErrorMessage
          name="checkbox"
          component="span"
          className={styles.error}
        />
      </div>

      <div role="group" aria-labelledby="my-radio-group">
        <label>
          <Field type="radio" name="radio" value="Option 1" />
          One
        </label>
        <label>
          <Field type="radio" name="radio" value="Option 2" />
          Two
        </label>

        <ErrorMessage name="radio" component="span" className={styles.error} />
      </div>

      <button type="submit" className={"disabled-btn"}>
        Sign In
      </button>
    </Form>
  </div>
);

const FormikApp = withFormik({
  mapPropsToValues({ email, select, checkbox, radio }) {
    return {
      email: email || "",
      select: select || "",
      checkbox: checkbox || false,
      radio: radio || "",
    };
  },
  validationSchema: Yup.object().shape({
    select: Yup.string().required("Color is required!"),
    email: Yup.string().email().required("Email is required"),
    checkbox: Yup.bool().oneOf([true], "Checkbox is required"),
    radio: Yup.string().required("Radio is required!"),
  }),
  handleSubmit(values) {
    alert(JSON.stringify(values));
  },
})(App);

export default FormikApp;
