import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import bg from "../../assets/bg9.jpg";

export default function GuestLayout({ children }) {
    return (
        <div
            className="relative flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0"
            style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <div className="relative z-10 mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg" style={{ backgroundColor : "#F2F4F3" }}>
                {children}
            </div>
        </div>
    );
}