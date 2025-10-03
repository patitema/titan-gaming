import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const USERS_KEY = "users";
const SESSION_KEY = "session";

function readUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
        return [];
    }
}

function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

useEffect(() => {
    const sess = localStorage.getItem(SESSION_KEY);
    if (sess) {
        setUser(JSON.parse(sess));
    }
}, []);

const register = ({ email, password, name }) => {
    const users = readUsers();
    if (users.find(u => u.email === email)) {
        throw new Error("Пользователь с таким email уже существует");
    }
    const newUser = { email, password, name };
    users.push(newUser);
    writeUsers(users);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
};

const login = ({ email, password }) => {
    const users = readUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
        throw new Error("Неправильный email или пароль");
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    setUser(found);
};

const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
};

const updateUser = (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    const users = readUsers().map(u =>
        u.email === user.email ? updated : u
    );
    writeUsers(users);
    setUser(updated);
};

return (
    <AuthContext.Provider value={{ user, register, login, logout, updateUser }}>
        {children}
    </AuthContext.Provider>
);
}

export function useAuth() {
    return useContext(AuthContext);
}
