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

## 🎨 Frontend Overview

- Built with **React 19** using **Vite** for ultra-fast builds.
- Key Screens (add screenshots if available):
  - **Contact List View** — Displays all contacts.
  - **Add/Edit Contact Form** — Create or update contacts.

---


