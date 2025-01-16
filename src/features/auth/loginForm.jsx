import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginUser } from "../../api/auth";

function LoginForm({setAuthForm}){
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        username: Yup.string()
          .required("El usuario es obligatorio"),
        password: Yup.string()
          .required("La contraseña es obligatoria"),
    });

    const handleFormSubmit = async (values) => {
        try {
            const data = await loginUser(values);
            console.log('Login exitoso:', data);
            localStorage.setItem('authToken', data.token);
            toast.success('¡Inicio de sesión exitoso!');
            navigate('/home');
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    return(
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleFormSubmit(values);
            }}
        >
          {() => (
              <Form className={`containerForm ${isVisible ? "fade-in" : ""}`}>
                  <h2 className="titleForm">INICIAR SESIÓN</h2>
                  <div className="containerInput login">
                      <label htmlFor="username">Usuario:</label>
                      <Field name="username" type="text" className="loginInput" />
                      <ErrorMessage name="username" component="div" className="error"/>
                  </div>
                  <div className="containerInput login">
                      <label htmlFor="password">Contraseña:</label>
                      <Field name="password" type="password" className="loginInput" />
                      <ErrorMessage name="password" component="div" className="error"/>
                  </div>
                  <div>
                      <p>¿No tiene cuenta? <span className="animated-gradient" onClick={() => setAuthForm(1)}>Registrarse</span></p>
                  </div>
                  <div className="formButtonContainer">
                      <button className="button" type="submit">
                          <span className="transition"></span>
                          <span className="gradient"></span>
                          <span className="label">Aceptar</span>
                      </button>
                  </div>
              </Form>
          )}
        </Formik>
    )
}


export default LoginForm;