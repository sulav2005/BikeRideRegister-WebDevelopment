import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const {register,handleSubmit,formState: { errors }} = useForm();    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = (data) => {
        setLoading(true);
        setErrorMsg("");
        fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                customerPassword: data.password
            })
        })
        .then(async response => {
            let result;
            try {
                result = await response.json();
            } catch (e) {
                result = { message: 'Invalid server response' };
            }
            if (response.ok && result.token) {
                localStorage.setItem('token', result.token);
                setSuccess(true);
                setTimeout(() => {
                  navigate('/dashboard');
                }, 1200);
            } else {
                setErrorMsg(result.message || 'Login failed');
            }
        })
        .catch(error => {
            setErrorMsg('Login failed');
            console.error('Error:', error);
        })
        .finally(() => setLoading(false));
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md mx-auto p-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in"
            >
                <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 animate-gradient">Login</h2>

                {success && (
                  <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-center animate-bounce-in">
                    Login successful! Redirecting...
                  </div>
                )}
                {errorMsg && (
                  <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 text-center animate-shake">
                    {errorMsg}
                  </div>
                )}

                <div className="mb-6">
                    <label htmlFor="email" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        id="email"
                        className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition-all duration-300"
                        autoComplete="email"
                        disabled={loading}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.email.message}</p>}
                </div>

                <div className="mb-8">
                    <label htmlFor="password" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        id="password"
                        className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-700 dark:text-white transition-all duration-300"
                        autoComplete="current-password"
                        disabled={loading}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="animate-spin inline-block mr-2 align-middle">🔄</span>
                    ) : (
                        <span>Login</span>
                    )}
                </button>

                <div className="mt-8 text-center">
                    <span className="text-gray-600 dark:text-gray-300">Don't have an account? </span>
                    <Link to="/register" className="text-blue-500 hover:underline font-semibold transition-colors duration-200">Register</Link>
                </div>
            </form>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.7s; }
                @keyframes bounce-in { 0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); } }
                .animate-bounce-in { animation: bounce-in 0.7s; }
                @keyframes shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }
                .animate-shake { animation: shake 0.5s; }
                @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
                .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
            `}</style>
        </div>
    );
};

export default Login;