export const fetchInterceptor = (navigate, setError) => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
        const response = await originalFetch(...args);
        const data = await response.clone().json().catch(() => null); // Intentar leer JSON sin romper la respuesta

        if (response.status === 401 || (data && data.eliminarToken)) {
            // Eliminar token de localStorage, sessionStorage y de MongoDB
            localStorage.clear();
            sessionStorage.clear();
            
            // Redirigir al login
            navigate('/login');
        }

        return response;
    };
};
