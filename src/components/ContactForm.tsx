import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, editContact } from '../store/contactSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store/store';

const ContactForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contact = useSelector((state: RootState) => state.contacts.contacts.find(c => c.id === id));

  const formik = useFormik({
    initialValues: {
      name: contact?.name || '',
      email: contact?.email || '',
      phone: contact?.phone || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
    }),
    onSubmit: (values) => {
      const newContact = { id: contact?.id || Date.now().toString(), ...values };
      if (contact) {
        dispatch(editContact(newContact));
      } else {
        dispatch(addContact(newContact));
      }
      navigate('/');
    },
  });

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Contact Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring ${
              formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring ${
              formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your phone number"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Save Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
