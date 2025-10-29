import React, { useState, useEffect } from 'react';
import { fetchProfile, updateProfile, fetchUserRequests } from '../api/authService';
import { logout, getRole, getEmail } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const userRole = getRole(); 
    const loggedInEmail = getEmail();

    // Initial state: Use loggedInEmail for email, others are placeholders
    const [profile, setProfile] = useState({ 
        name: 'Loading...', 
        email: loggedInEmail || 'Loading...', 
        phone: 'N/A', 
        address: 'Headquarters', 
        profilePicture: '' 
    });
    const [updateFormData, setUpdateFormData] = useState({}); 
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('Fetching profile details...');
    const [showUpdateForm, setShowUpdateForm] = useState(false); 
    const [requests, setRequests] = useState([]); 
    const navigate = useNavigate();

    const getStatusBadge = (status) => {
        switch (status) {
            case 'PENDING': return 'badge bg-warning text-dark';
            case 'APPROVED': return 'badge bg-primary';
            case 'SCHEDULED': return 'badge bg-info';
            case 'REJECTED': return 'badge bg-danger';
            default: return 'badge bg-secondary';
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                // 1. Fetch the actual User data (Backend returns the User object JSON)
                const profileResponse = await fetchProfile();
                const userData = profileResponse.data; 

                // 2. Load Request History (Only load if user is NOT Admin)
                if (userRole !== 'ROLE_ADMIN') {
                    const requestsResponse = await fetchUserRequests(); 
                    setRequests(requestsResponse.data);
                }

                // 🟢 CRITICAL FIX: Set state by merging fetched userData with the existing state
                setProfile(p => ({ 
                    ...p, // Start with current defaults
                    ...userData, // Overwrite with all fields from the backend (name, phone, address)
                    email: loggedInEmail || userData.email, // Ensure email is correctly prioritized
                    // Apply role designation for display (using fetched name if available)
                    name: userData.name || (userRole === 'ROLE_ADMIN' ? 'ADMINISTRATOR' : 'Standard User')
                })); 
                
                // Initialize update form with the fetched data
                setUpdateFormData(userData); 
                setMessage("Profile and Dashboard loaded successfully.");
                
            } catch (error) {
                console.error("Failed to load data:", error);
                setRequests([]); 
                setMessage("Failed to load data. Check console for API errors.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [userRole, loggedInEmail]); // Added dependencies to satisfy React rules

    const handleUpdateChange = (e) => {
        setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setMessage('Saving changes...');
        try {
            await updateProfile(updateFormData); 
            // Update the display state with the new data from the form
            setProfile(p => ({...p, ...updateFormData})); 
            setMessage("✅ Profile updated successfully!");
            setShowUpdateForm(false);
        } catch (error) {
            setMessage("❌ Update failed. Network or server error."); 
            console.error("Update failed:", error);
        }
    };

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };


    if (loading) return <div className="container mt-5">Loading Dashboard...</div>;

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                
                {/* -------------------- 1. LEFT SIDEBAR (READ-ONLY DETAILS & ACTIONS) -------------------- */}
                <div className="col-lg-3 col-md-4">
                    <div className={`card shadow-sm p-3 mb-4 ${userRole === 'ROLE_ADMIN' ? 'bg-danger-subtle' : 'bg-light'}`}>
                        <h4 className="card-title">{userRole === 'ROLE_ADMIN' ? 'ADMIN PANEL' : 'User Profile'}</h4>
                        <div className="list-group list-group-flush">
                            {/* Display REAL DATA HERE */}
                            <p className="list-group-item"><strong>Name:</strong> {profile.name}</p>
                            <p className="list-group-item"><strong>Email:</strong> {profile.email}</p>
                            {userRole !== 'ROLE_ADMIN' && <p className="list-group-item"><strong>Phone:</strong> {profile.phone || 'N/A'}</p>}
                            {userRole !== 'ROLE_ADMIN' && <p className="list-group-item"><strong>Address:</strong> {profile.address || 'Not Set'}</p>}
                        </div>

                        <div className="d-grid gap-2 mt-4">
                            {/* 🟢 ACTION BUTTONS: Hide/Show based on Role */}
                            {userRole === 'ROLE_USER' && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setShowUpdateForm(!showUpdateForm)}
                                        className="btn btn-warning btn-sm"
                                    >
                                        {showUpdateForm ? 'Cancel Update' : 'Update Profile Info'}
                                    </button>
                                     <a href="/submit" className="btn btn-success btn-lg">Submit New E-Waste Request</a>
                                </>
                            )}

                            {userRole === 'ROLE_ADMIN' && (
                                <p className="text-danger fw-bold text-center">Admin access only.</p>
                            )}

                            <button onClick={handleLogout} className="btn btn-outline-danger mt-3">Logout</button>
                        </div>
                    </div>

                    <div className="text-center mt-3">
                        <small className="text-muted">{message}</small>
                    </div>
                </div>

                {/* -------------------- 2. RIGHT CONTENT (DASHBOARD & SUBMISSION) -------------------- */}
                <div className="col-lg-9 col-md-8">

                    <h3 className="mb-4">{userRole === 'ROLE_ADMIN' ? 'ADMIN REQUESTS OVERVIEW' : 'Your Request History'}</h3>

                    {/* Conditional Update Form (Only visible to USER role) */}
                    {showUpdateForm && userRole === 'ROLE_USER' && (
                        <div className="card shadow-sm p-4 mb-4 border-warning">
                            <h5 className="card-title text-warning">Edit Profile Information</h5>
                            <form onSubmit={handleUpdateSubmit}>
                                <div className="row">
                                    <div className="col-sm-6 mb-3">
                                        <input type="text" name="name" placeholder="Name" value={updateFormData.name || ''} onChange={handleUpdateChange} className="form-control" required />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <input type="text" name="phone" placeholder="Phone" value={updateFormData.phone || ''} onChange={handleUpdateChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="address" placeholder="Pickup Address" value={updateFormData.address || ''} onChange={handleUpdateChange} className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-sm btn-warning">Save Changes</button>
                            </form>
                        </div>
                    )}


                    {/* 🟢 CONDITIONAL DASHBOARD CONTENT */}
                    {userRole === 'ROLE_ADMIN' ? (
                         // ADMIN VIEW: Placeholder for admin tasks
                        <div className="alert alert-danger">
                            Admin Task: Implement Request Management and Scheduling View here.
                        </div>
                    ) : (
                        // USER VIEW: Shows personal request history
                        <>
                          <h4 className="mt-5">E-Waste Submission History ({requests.length} Total)</h4>
                          {requests.length === 0 ? (
                              <p className="alert alert-info">No requests submitted yet. Click 'Submit New Request' to begin.</p>
                          ) : (
                              <div className="list-group">
                                  {requests.map((req) => (
                                      <div key={req.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                          <div>
                                              <strong>{req.deviceType}</strong> (Qty: {req.quantity}, {req.deviceCondition})
                                              <small className="d-block text-muted">Pickup: {req.pickupAddress}</small>
                                          </div>
                                          <span className={getStatusBadge(req.status)}>
                                              {req.status}
                                          </span>
                                      </div>
                                  ))}
                              </div>
                          )}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Profile;