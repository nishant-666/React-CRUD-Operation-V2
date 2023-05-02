import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function Update() {
    let navigate = useNavigate();
    const [id, setID] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState(false);

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('First Name'));
        setLastName(localStorage.getItem('Last Name'));
        setCheckbox(localStorage.getItem('Checkbox Value')  === 'true' ? true : false)
    }, []);

    const updateAPIData = () => {
        axios.put(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`, {
            firstName,
            lastName,
            checkbox
        }).then(() => {
            navigate.push('/read')
        })
    }
    return (
        <div>
            <div style={{ marginTop: 20,marginBottom: 20 }}>
                <Link to="/">
                    <Button color='violet'>Home</Button>
                </Link>
            </div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' checked={checkbox} onChange={() => setCheckbox(!checkbox)} />
                </Form.Field>
                <Button color="green" type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
