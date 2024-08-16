import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteContact } from '../store/contactSlice';
import { Link, useNavigate } from 'react-router-dom';
import LineGraph from './LineGraph';
import Map from './Map';

const ContactList = React.memo(() => {
  const navigate = useNavigate();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const contactList = useMemo(() => {
    return (
        contacts && contacts?.length > 0 ?
            contacts.map(contact => (
                <tr key={contact.id} className="border-b">
                    <td className="p-4 text-center">{contact.name}</td>
                    <td className="p-4 text-center">{contact.email}</td>
                    <td className="p-4 text-center">{contact.phone}</td>
                    <td className="p-4 text-center">
                    <button 
                        onClick={() => dispatch(deleteContact(contact.id))} 
                        className="bg-red-500 text-white p-2 rounded"
                    >
                        Delete
                    </button>
                    <Link to={`/edit/${contact.id}`} className="bg-green-500 text-white p-2 rounded ml-2">Edit</Link>
                    </td>
                </tr>
            ))
        : <tr className="border-b">
            <td className="p-4 text-center"  colSpan={4}>No Contact Added Yet</td>
          </tr>
  )}, [contacts, dispatch]);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/add")}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Add Contact
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-center">Name</th>
              <th className="p-4 text-center">Email</th>
              <th className="p-4 text-center">Phone</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contactList}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="flex-1">
          <Map />
        </div>
        <div className="flex-1">
          <LineGraph />
        </div>
      </div>
    </div>
  );
});

export default ContactList;
