import React from "react";
import { Formik } from "formik";
// import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import axios from "axios";
import { withRouter } from "react-router-dom";

const ValidatedLoginForm = (props) => (
 
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      console.log("Loging in ...", values);
      console.log("props.history: " + props.history);
      axios.post("/api/login", values)
        .then(() => {
          setSubmitting(false);
          props.history.push('/home')
        }).catch(error => {
          console.log("error.response: ", error.response)
          //console.log(error.response.data)
          if (error && error.response && error.response.data === "Unauthorized") {
            console.log("Username or Password Incorrect!");
            alert("Login Error: Username or Password incorrect!")
           // this.setState({
           //   LoginError: "username or password"
          //  });
          }
        });

    }}


    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Required"),
      password: Yup.string()
        .required("No password provided")
      // .min(8, "Password is too short - should be 8 chars minimum.")
      // .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        // isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <form onSubmit={handleSubmit}>
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
          <button type="submit" href="/home" onClick={handleSubmit}>Submit</button>
        </form>
      );
    }}
  </Formik>
);

export default withRouter(ValidatedLoginForm);
//export default ValidatedLoginForm;
