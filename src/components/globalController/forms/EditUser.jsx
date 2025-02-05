import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdCancel } from "react-icons/md";
import { encryptId } from "../../../utils/Crypto";
import { editUser } from "../../../redux/slices/usersSlice";

const EditUser = ({ isOpen, onClose, user }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        role: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email) {
            alert("Username and Email are required!");
            return;
        }
        dispatch(editUser({ userId: encryptId(user._id), userData: formData }))
            .unwrap()
            .then(() => {
                onClose();
            })
            .catch((err) => {
                console.error("Error editing user:", err);
            });
    };
    

    if (!isOpen) return null; 



    return (
        <div className="bg-black/40 top-0 left-0 right-0 fixed flex justify-center items-center min-h-screen z-50">
            <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
                <h2>Edit User</h2>
                <div className="flex flex-row">
                    <button
                        onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                    >
                        <MdCancel size={24} />
                    </button>

                </div>
                <form className="flex flex-col gap-4"
                    onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />
                    <label>Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
