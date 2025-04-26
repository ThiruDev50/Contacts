# 📞 Contact App

A simple full-stack application built with **.NET 8 Web API** and **React 19**.  
The backend uses **Entity Framework Core** with an **InMemory Database**, perfect for quick setups and testing.

---

## 🔥 Tech Stack

| Layer    | Technology |
|----------|------------|
| Backend  | .NET 8 Web API, Entity Framework Core (InMemory) |
| Frontend | React 19 (Vite + Tailwind CSS) |
| Database | InMemory Provider |

---


## 🎨 Frontend Overview

- Built with **React 19** using **Vite** for ultra-fast builds.
- Key Screens (add screenshots if available):
  - **Contact List View** — Displays all contacts.
  - **Add/Edit Contact Form** — Create or update contacts.

**Screenshots:**
- Landing page
![alt text](https://github.com/ThiruDev50/Contacts/blob/main/Screenshots/UI_Landing_Page.png?raw=true)

- Create new Contact
![alt text](https://github.com/ThiruDev50/Contacts/blob/main/Screenshots/UI_Create_Contact.png?raw=true)

- Update Contact
![alt text](https://github.com/ThiruDev50/Contacts/blob/main/Screenshots/UI_Update_Contact.png?raw=true)

- Delete Contact
![alt text](https://github.com/ThiruDev50/Contacts/blob/main/Screenshots/UI_Delete_Contact.png?raw=true)

- Filter Contact
![alt text](https://github.com/ThiruDev50/Contacts/blob/main/Screenshots/UI_Filter_By.png?raw=true)

- Sort Contact By
![alt text](https://github.com/ThiruDev50/Contacts/blob/main/Screenshots/UI_Sort_by.png?raw=true)

- With Dev tools
![alt text](https://github.com/ThiruDev50/Contacts/blob/main/Screenshots/UI_With_Devtools.png?raw=true)

---


## 🛠 Backend Overview

The Web API exposes full CRUD operations through the `ContactController`:

| HTTP Verb | Endpoint | Description |
|-----------|----------|-------------|
| GET | `/api/Contacts` | Retrieve all contacts |
| GET | `/api/Contacts/{id}` | Retrieve a specific contact |
| POST | `/api/Contacts` | Create a new contact |
| PUT | `/api/Contacts/{id}` | Update an existing contact |
| DELETE | `/api/Contacts/{id}` | Delete a contact by ID |

**Highlights:**
- Decorated with `[ApiController]` and `[Route("api/[controller]")]`
- Async/await pattern for better performance
- Clean, well-documented code with XML comments

---
