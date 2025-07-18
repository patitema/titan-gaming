import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import './Profile.css';

function Profile() {
    const { user, logout, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        tel: "",
        address: ""
    });

    useEffect(() => {
        if (user) {
        setFormData({
            name: user.name || "",
            email: user.email || "",
            password: user.password || "",
            tel: user.tel || "",
            address: user.address || ""
        });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        alert("Данные профиля сохранены");
    };

    if (!user) {
        return <p>Пожалуйста, <a href="/login">войдите</a> для доступа к кабинету.</p>;
    }

    return (
        <div>
            <main>
                <div className='profile-container'>
                    <h3>Личный кабинет</h3>
                    <form onSubmit={handleSubmit} className="form-profile">
                        <ul className="list-profile">
                        {[
                            { label: "Имя",     name: "name",    type: "text"      },
                            { label: "Почта",   name: "email",   type: "email"     },
                            { label: "Пароль",  name: "password",type: "password"  },
                            { label: "Телефон", name: "tel",     type: "tel"       },
                            { label: "Адрес",   name: "address", type: "text"      }
                        ].map(field => (
                            <li key={field.name} className="profile-item">
                            <label htmlFor={field.name}>{field.label}:</label>
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleChange}
                                readOnly={false}
                            />
                            <button type="button" className="edit-btn">
                                <svg width="16" height="16">
                                <use href="/images/icons.svg#icon-edit" />
                                </svg>
                            </button>
                            </li>
                        ))}
                        </ul>
                        <div className="profile-actions">
                            <button type="submit" className="save-btn">Сохранить</button>
                            <button type="button" className="logout-btn" onClick={logout}>Выйти</button>
                        </div>
                    </form>
                    <h2>Вы смотрели:</h2>
                    <ul className='list-watched'>
                        <li>
                            <img src="/images/Bashmak.png" alt="Bashmak" />
                            <p>Bashmak</p>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default Profile;
