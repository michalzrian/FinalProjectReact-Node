import './css/currentUser.css';
function CurrentUser({ user }: { user: any }) {
    return (
        <div className="users-container">
            <p><strong>Id:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <div>
                {user.profileImage && (
                    <img 
                        src={`http://localhost:5000/uploads/${user.profileImage}`}
                        alt={`${user.name}'s profile`}
                    />
                )}
            </div>
        </div>
    )
}
export default CurrentUser;