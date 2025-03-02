export const fetchInterceptor = (navigate, setError) => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
        const response = await originalFetch(...args);
        const data = await response.clone().json().catch(() => null);
        const currentUrl = window.location.href;

        console.log("Interceptando respuesta:", response.status, "URL actual:", currentUrl);

        // Excluir la ruta /cambiar-contra de la redirección al login
        if (response.status === 401 && !currentUrl.includes("#/cambiar-contra/")) {
            console.warn("Redirigiendo al login por error 401");
            localStorage.clear();
            sessionStorage.clear();
            navigate('/login');
        }

        return response;
    };
};