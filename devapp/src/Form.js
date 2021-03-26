import React, { useState, useEffect } from 'react'
import FormSchema from './FormSchema';
import axios from 'axios';
import * as yup from 'yup'


const initialFormValues = {
    name: "",
    email: "",
    password: "",
    //checkboxes//
    termsOfService: false,
    userAgreement: false

}


const initialFormErrors = {
    name: "",
    email: "",
    password: "",
    //checkboxes//
    termsOfService: false,
    userAgreement: false

}

const initialDisabled = true


export default function Form() {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)


    const handleSubmit = e => {
        e.preventDefault()
        const newMember = {
            name: formValues.name.trim(),
            email: formValues.email.trim(),
            password: formValues.password.trim(),
            Terms: ['termsOfService', 'userAgreement'].filter(e => formValues[e])
        }
        postNewMember(newMember)

    }

    const postNewMember = newMember => {
        axios.post('https://reqres.in/api/users', newMember)
            .then(res => {
                setUsers([...users, res.data])
            })
            .catch(err => {
                console.log(err);
            })
        setFormValues(initialFormValues)
    }



    setFormValues({
        ...formValues,
        [name]: value
    })
}

const validateChange = (name, value) => {
    // yup.reach({FormSchema,name})
    // .validate(value)
    // .then(()=>{
    //   setFormErrors({...formErrors, [name]: ''})
    // })
    // .catch(err=>{
    //   setFormErrors({...formErrors, [name]: err.errors[0]})
    // })




    useEffect(() => {
        FormSchema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])

    const onChange = e => {
        const { name, value, type, checked } = e.target
        const usingValue = type === 'checkbox' ? checked : value
        validateChange(name, usingValue)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2>Add Member</h2>
                <button disabled={disabled}>Submit</button>
                <div>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.termsOfService}</div>
                    <div>{errors.userAgreement}</div>
                </div>
            </div>
            <div>
                <h3>MEMBER'S INFO</h3>
                <label>Name&nbsp;
                <input
                        value={formValues.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                    />
                </label>
                <label>Email&nbsp;
                <input
                        value={formValues.email}
                        onChange={onChange}
                        name='email'
                        type='email'
                    />
                </label>
                <label>Password&nbsp;
                <input
                        value={formValues.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>
            </div>
            <div>
                <h4>Terms</h4>
                <label>Terms of service
                <input
                        checked={formValues.termsOfService}
                        onChange={onChange}
                        name='termsOfService'
                        type='checkbox'
                    />
                </label>
                <label>User Agreement
                <input
                        checked={formValues.userAgreement}
                        onChange={onChange}
                        name='userAgreement'
                        type='checkbox'
                    />
                </label>



            </div>







        </form>
    )
}
