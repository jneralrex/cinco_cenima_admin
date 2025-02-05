import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdCancel } from 'react-icons/md';
import { getAllLocation } from '../../../redux/slices/locationSlice';
import { editEvent, getEvents } from '../../../redux/slices/eventSlice';
import { encryptId } from '../../../utils/Crypto';

const EditEvent = ({ isOpen, onClose, event }) => {
    const { loading, error } = useSelector((state) => state.events);
    const {
        loading: locationLoading,
        error: locationError,
        locations = [],
    } = useSelector((state) => state.locations);
    const  loggedAdmin = useSelector((state) => state.theatre?.theatre?.theatre?._id);
    

    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen) {
            dispatch(getAllLocation());
        }
    }, [dispatch, isOpen]);

    const [formData, setFormData] = useState({
        eventName: '',
        eventHost: '',
        eventPrice: '',
        flyerImage: null,
        eventDate: '',
        eventTime: '',
        currency: '',
        location: '',
    });

    useEffect(() => {
        if (event) {
            setFormData({
                eventName: event.eventName,
                eventHost: event.eventHost,
                eventPrice: event.eventPrice,
                eventDate: event.eventDate,
                flyerImage: event.flyerImage,
                eventTime: event.eventTime,
                currency: event.currency,
                location: event.location,
            });
        }
    }, [event]);

    const handleInput = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = new FormData();
        Object.keys(formData).forEach((key) => {
            payload.append(key, formData[key]);
        });

        dispatch(editEvent({ eventId: encryptId(event._id), eventData: payload, loggedAdmin }))
            .unwrap()
            .then(() => {
                console.log({
                    eventId: encryptId(event._id),
                    location: formData.location,
                });
                setFormData({
                    eventName: '',
                    eventHost: '',
                    eventPrice: '',
                    flyerImage: null,
                    eventDate: '',
                    eventTime: '',
                    currency: '',
                    location: '',
                });
                onClose();
                dispatch(getEvents())
            })
            .catch((err) => {
                console.error(err);
            });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bg-black/40 z-50 flex justify-center items-center min-h-screen">
            <div className="relative bg-white rounded-lg shadow-lg w-[95%] max-w-[800px] p-6 lg:max-w-[600px] overflow-y-auto max-h-[90vh]">
                <h2 className="text-lg font-semibold mb-4">Edit Event</h2>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                >
                    <MdCancel size={24} />
                </button>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <p className="font-semibold mb-1">Current Location</p>
                        {event?.location?.length > 0 ? (
                            <p className="text-gray-700">
                                {event.location[0].location[0].state}, {event.location[0].location[0].cities[0].city},
                                {event.location[0].location[0].cities[0].street}
                            </p>
                        ) : (
                            <p className="text-gray-500">No location data available.</p>
                        )}
                    </div>

                    {event.flyerImage && (
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <img
                                src={event.flyerImage}
                                alt="Event flyer"
                                className="w-full object-cover"
                            />
                        </div>
                    )}


                    <input
                        type="text"
                        name="eventName"
                        placeholder="Event Name"
                        value={formData.eventName}
                        onChange={handleInput}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <input
                        type="text"
                        name="eventHost"
                        placeholder="Host Name"
                        value={formData.eventHost}
                        onChange={handleInput}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <input
                        type="number"
                        name="eventPrice"
                        placeholder="Event Price"
                        value={formData.eventPrice}
                        onChange={handleInput}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <input
                        type="text"
                        name="currency"
                        placeholder="Currency (e.g., ₦, $)"
                        value={formData.currency}
                        onChange={handleInput}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInput}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <input
                        type="text"
                        name="eventTime"
                        placeholder="Time (e.g., 12:00 PM)"
                        value={formData.eventTime}
                        onChange={handleInput}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <input
                        type="file"
                        name="flyerImage"
                        onChange={handleInput}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${loading
                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        {loading ? 'Saving...' : 'Save Event'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditEvent;
