import { useState } from "react";
import { useEffect } from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../api/auth";


function RegisterForm ({setAuthForm}){
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("El usuario es obligatorio")
            .min(6, "*El usuario debe tener mínimo 6 carácteres"),
        password: Yup.string()
            .required("La contraseña es obligatoria")
            .min(6, "*la contraseña debe tener mínimo 6 carácteres"),
        name: Yup.string()
            .required("El nombre es obligatorio"),
        surname: Yup.string()
            .required("El apellido es obligatorio"),
        mail: Yup.string()
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Escriba un mail válido")
            .required("El mail es obligatorio"),
        phone_number: Yup.string()
            .matches(/^(\+34)?\s?\d{9}$/, "El teléfono debe contener 9 números")
            .required("El teléfono es obligatorio"),
        birth_date: Yup.string()
            .required("La fecha de nacimiento es obligatoria"),
        dni: Yup.string()
            .matches(/^\d{8}[A-HJ-NP-TV-Z]$/, "El DNI debe contener 8 números y 1 letra")
            .required("El DNI/NIF es obligatorio"),
    });


    const handleFormSubmit = async (values) => {
        try {
            const data = await registerUser(values);
            console.log('Registro exitoso:', data);
            toast.success('¡Registro exitoso!');
            setAuthForm(0);
        } catch (error) {
            toast.error(error.message);
        }
    }
    

    return(
        <Formik
            initialValues={{username:"", password:"", name:"", surname:"", mail:"", phone_number:"", birth_date:"", dni:""}}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleFormSubmit(values);
            }}
        >
            <Form className={`containerForm ${isVisible ? "fade-in" : ""}`}>
                <h2 className="titleForm">FORMULARIO DE REGISTRO</h2>
                <div className="containerInput register">
                    <label htmlFor="username">Usuario:</label>
                    <Field name="username" type="text"className="loginInput" />
                    <ErrorMessage name="username" component="div" className="error" />
                </div>
                <div className="containerInput register">
                    <label htmlFor="password">Contraseña:</label>
                    <Field name="password" type="text" className="loginInput" />
                    <ErrorMessage name="password" component="div" className="error" />
                </div>
                <div className="containerInput register">
                    <label htmlFor="name">Nombre</label>
                    <Field name="name" type="text" className="loginInput" />
                    <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="containerInput register">
                    <label htmlFor="surname">Apellido</label>
                    <Field name="surname" type="text" className="loginInput" />
                    <ErrorMessage name="surname" component="div" className="error" />
                </div>
                <div className="containerInput register">
                    <label htmlFor="mail">Mail</label>
                    <Field name="mail" type="text" className="loginInput" />
                    <ErrorMessage name="mail" component="div" className="error" />
                </div>
                <div className="containerInput register">
                    <label htmlFor="phone_number">Teléfono</label>
                    <Field name="phone_number" type="text" className="loginInput" />
                    <ErrorMessage name="phone_number" component="div" className="error" />
                </div>
                <div className="containerInput register">
                    <label htmlFor="birth_date">Fecha de nacimiento</label>
                    <Field name="birth_date" type="date" className="loginInput" />
                    <ErrorMessage name="birth_date" component="div" className="error" />
                </div>
                <div className="containerInput register">
                    <label htmlFor="dni">DNI/NIF:</label>
                    <Field name="dni" type="text" className="loginInput" />
                    <ErrorMessage name="dni" component="div" className="error" />
                </div>
                <div>
                    <p>¿Ya tiene cuenta? <span className="animated-gradient" onClick={() => setAuthForm(0)}>Iniciar sesión</span></p>
                </div>
                <div className="formButtonContainer">
                    <button className="button" type="submit">
                        <span className="transition"></span>
                        <span className="gradient"></span>
                        <span className="label">Aceptar</span>
                    </button>
                </div>
            </Form>
        </Formik>
    )
}


export default RegisterForm