export default function User({ user }){
    return (
        <div>
            <h1>Hello {user.name}, now you are logged in</h1>
            <a href='/api/auth/logout'>Logout</a>
        </div>
    )
}