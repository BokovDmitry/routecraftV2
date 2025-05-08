import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LoadScript } from '@react-google-maps/api'; // Import LoadScript
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import "../css/app.css";

const GOOGLE_MAPS_API_KEY = 'AIzaSyCIGBnnn_8MNJJYavXOUPBjfFdWKqicOaU'; // Replace with your API key

createInertiaApp({
    resolve: name =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        createRoot(el).render(
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
                <App {...props} />
            </LoadScript>
        );
    },
});