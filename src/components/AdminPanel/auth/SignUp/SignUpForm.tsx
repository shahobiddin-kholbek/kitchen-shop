'use client'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styles from '../../../Header/UserAccount/Drawer/auth/userForm.module.scss'
import { useAddAdminMutation } from '@/provider/redux/apies/adminApi';
import { AdminType } from '@/Types/admin_types';
import { message } from 'antd';

export default function AdminSignUpForm() {
    const [addAdmin, { isError: isErrorAdmin, error: errorAdmin, isSuccess: isSuccessAdmin }] = useAddAdminMutation();
    const [newAdmin, setNewAdmin] = useState<AdminType>({
        id: uuidv4(),
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        accessLevel: 'admin',
    })

    useEffect(() => {
        if (isErrorAdmin) {
            message.error('Error add admin')
        } else if (isSuccessAdmin) {
            message.success('Admin added successfully')
            setNewAdmin({ ...newAdmin, name: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '' });

        }
    }, [isErrorAdmin, isSuccessAdmin])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewAdmin({ ...newAdmin, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (newAdmin.password !== newAdmin.confirmPassword) {
                message.error('Passwords do not match');
            } else {
                await addAdmin(newAdmin);
            }
        } catch (err) {
            console.log(err);
        }
        console.log("Form submitted", newAdmin);
    };
    return (
        <div className={`${styles.user_form_container} h-[80vh]`}>
            <form onSubmit={handleSubmit} className={`${styles.user_form}`}>
                <h1>Sign Up</h1>
                <label htmlFor="name">
                    Name:
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={newAdmin.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="lastName">
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={newAdmin.lastName}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={newAdmin.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={newAdmin.password}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="confirmPassword">
                    Confirm Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={newAdmin.confirmPassword}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="phone">
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={newAdmin.phone}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="accessLevel">
                    Access Level:
                    <select
                        name="accessLevel"
                        id="accessLevel"
                        value={newAdmin.accessLevel}
                        onChange={handleChange}
                    >
                        <option value="admin">Admin</option>
                        <option value="superadmin">superadmin</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}
