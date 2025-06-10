import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const USERS_KEY = "tg-users";
const SESSION_KEY = "tg-session";

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

  // При монтировании читаем сессию
useEffect(() => {
    const sess = localStorage.getItem(SESSION_KEY);
    if (sess) {
        setUser(JSON.parse(sess));
    }
}, []);

  // Регистрация нового пользователя
const register = ({ email, password, name }) => {
    const users = readUsers();
    // Проверяем, нет ли уже такого email
    if (users.find(u => u.email === email)) {
        throw new Error("Пользователь с таким email уже существует");
    }
    const newUser = { email, password, name };
    users.push(newUser);
    writeUsers(users);
    // Сразу логиним после регистрации
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
};

  // Вход
const login = ({ email, password }) => {
    const users = readUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
        throw new Error("Неправильный email или пароль");
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    setUser(found);
};

  // Выход
const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
};

return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
        {children}
    </AuthContext.Provider>
);
}

export function useAuth() {
    return useContext(AuthContext);
}
