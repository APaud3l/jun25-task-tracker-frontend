import { API_BASE_URL } from "./config";

export async function loginRequest({ email, password }){
    const response = await fetch(`https://jun25-t2-task-tracker-api.onrender.com/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
    });

    const data = await response.json();
    // console.log(data);
    if(!response.ok) {
        throw new Error(data.error || data.name || data.message || 'Login failed.');
    }

    return data;
}

export async function signupRequest({ email, password, role }){
        const response = await fetch(`https://jun25-t2-task-tracker-api.onrender.com/api/v1/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password, role})
    });

    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.error || data.name || data.message || 'Registeration failed.');
    }

    return data;
}