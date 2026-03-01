import React from 'react'
// import './HomePage.css'

const HomePage = () => {
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <h1 className="logo">MyApp</h1>
                    <div className="nav-buttons">
                        <button className="btn btn-login" onClick={() => window.location.href = '/login'}>
                            Login
                        </button>
                        <button className="btn btn-register" onClick={() => window.location.href = '/register'}>
                            Register
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default HomePage
