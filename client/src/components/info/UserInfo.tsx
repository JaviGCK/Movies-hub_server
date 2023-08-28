interface UserInfoProps {
    userData: UserData | null;
}

export const UserInfo: React.FC<UserInfoProps> = ({ userData }) => {
    return (
        <div>
            {userData ? (
                <div>
                    <h2>User Profile</h2>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Created At: {userData.createdAt}</p>
                    <p>Updated At: {userData.updatedAt}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};


