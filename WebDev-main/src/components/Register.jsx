import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
    const {
        register: Register2,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = (data) => {
        setLoading(true);
        setErrorMsg("");
        fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerName: data.customerName,
                email: data.email,
                customerPassword: data.customerPassword,
                confirmPassword: data.customerPassword,
                customerAddress: data.customerAddress || '',
                customerGender: data.customerGender || '',
                customerType: ''
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
                setSuccess(true);
                setTimeout(() => {
                  navigate('/login');
                }, 1200);
            } else {
                setErrorMsg(result.message || 'Registration failed');
            }
        })
        .catch(error => {
            setErrorMsg('Registration failed');
            console.error('Error:', error);
        })
        .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md mx-auto p-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in"
            >
                <h2 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 dark:from-pink-300 dark:via-blue-300 dark:to-purple-300 animate-gradient">Register</h2>

                {success && (
                  <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-center animate-bounce-in">
                    Registration successful! Redirecting to login...
                  </div>
                )}
                {errorMsg && (
                  <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 text-center animate-shake">
                    {errorMsg}
                  </div>
                )}

                <div className="mb-6">
                    <label htmlFor="username" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Username</label>
                    <input
                        type="text"
                        {...Register2("customerName", { required: "Username is required" })}
                        id="username"
                        className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-700 dark:text-white transition-all duration-300"
                        autoComplete="username"
                        disabled={loading}
                    />
                    {errors.customerName && <span className="text-red-500 text-sm animate-fade-in">{errors.customerName.message}</span>}
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                        type="email"
                        {...Register2("email", { required: "Email is required" })}
                        id="email"
                        className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition-all duration-300"
                        autoComplete="email"
                        disabled={loading}
                    />
                    {errors.email && <span className="text-red-500 text-sm animate-fade-in">{errors.email.message}</span>}
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        {...Register2("customerPassword", { required: "Password is required" })}
                        id="password"
                        className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white transition-all duration-300"
                        autoComplete="new-password"
                        disabled={loading}
                    />
                    {errors.customerPassword && <span className="text-red-500 text-sm animate-fade-in">{errors.customerPassword.message}</span>}
                </div>

                <div className="mb-6">
                    <label htmlFor="address" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Address</label>
                    <input
                        type="text"
                        {...Register2("customerAddress")}
                        id="address"
                        className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:text-white transition-all duration-300"
                        autoComplete="address"
                        disabled={loading}
                    />
                </div>

                <div className="mb-8">
                    <label htmlFor="gender" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                    <select
                        {...Register2("customerGender")}
                        id="gender"
                        className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-200 dark:bg-gray-700 dark:text-white transition-all duration-300"
                        disabled={loading}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="animate-spin inline-block mr-2 align-middle">🔄</span>
                    ) : (
                        <span>Register</span>
                    )}
                </button>

                <div className="mt-8 text-center">
                    <span className="text-gray-600 dark:text-gray-300">Already have an account? </span>
                    <Link to="/login" className="text-pink-500 hover:underline font-semibold transition-colors duration-200">Login</Link>
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

export default Register;
