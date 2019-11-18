import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios"
import { withRouter } from "react-router-dom"

const ValidatedRegisterForm = (props) => (
  <Formik
    initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      console.log("Registering...", values);
      axios.post("/api/register", values)
        .then(() => {
          setSubmitting(false);
          props.history.push('/home')
        })
    }}


  validationSchema={Yup.object().shape({
    firstName: Yup.string()
      .required("Required"),
    lastName: Yup.string()
      .required("Required"),
    email: Yup.string()
      .email()
      .required("Required"),
    password: Yup.string()
      .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum.")
    // .matches(/(?=.*[0-9])/, "Password must contain a number.")
  })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.firstName && touched.firstName && "error"}
          />
          {errors.firstName && touched.firstName && (
            <div className="input-feedback">{errors.firstName}</div>
          )}
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.lastName && touched.lastName && "error"}
          />
          {errors.lastName && touched.lastName && (
            <div className="input-feedback">{errors.lastName}</div>
          )}
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
          />
          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      );
    }}
  </Formik>
);

export default withRouter(ValidatedRegisterForm);
