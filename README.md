# 📧 Surat – Mini Email Notification Service

**Surat** is a lightweight email notification service with support for **MJML** (email templates), **Handlebars** (variable injection), and built-in **Swagger API docs**.  
It is packaged as a Docker image for easy deployment with SMTP integration.

---

## ✨ Features
- 📩 Send emails via any SMTP provider  
- 🎨 Templating with **MJML** + **Handlebars**  
- 🛠️ Auto-generated Swagger docs (`/api`)
- 🐳 Docker image ready to use  
- 🔑 Easy configuration via environment variables  

---

## 🚀 Quick Start

### Pull image
```bash
docker pull ariefsn/surat:latest
```

### Run container
```bash
docker run -d   -p 3000:3000   -e PORT=3000   -e SMTP_HOST=smtp.example.com   -e SMTP_PORT=587   -e SMTP_USER=myuser   -e SMTP_PASSWORD=mypassword   -e SMTP_SECURE=false   -e DEFAULT_SENDER_EMAIL=no-reply@example.com   -e DEFAULT_SENDER_NAME="My App"   --name surat   ariefsn/surat:latest
```

### Docker Compose
```yaml
version: "3.8"

services:
  surat:
    image: ariefsn/surat:latest
    container_name: surat
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      PORT: 3000
      SMTP_HOST: smtp.example.com
      SMTP_PORT: 587
      SMTP_USER: myuser
      SMTP_PASSWORD: mypassword
      SMTP_SECURE: "false"
      DEFAULT_SENDER_EMAIL: no-reply@example.com
      DEFAULT_SENDER_NAME: "My App"
```

---

## ⚙️ Environment Variables

| Variable               | Required | Default | Description |
|------------------------|----------|---------|-------------|
| `PORT`                 | ✅       | `3000`  | Port the app listens on |
| `SMTP_HOST`            | ✅       | –       | SMTP server host |
| `SMTP_PORT`            | ✅       | –       | SMTP server port |
| `SMTP_USER`            | ✅       | –       | SMTP username |
| `SMTP_PASSWORD`        | ✅       | –       | SMTP password |
| `SMTP_SECURE`          | ❌       | `false` | Enable TLS/SSL (`true` / `false`) |
| `SMTP_POOL`            | ❌       | `true`  | Enable connection pooling (`true` / `false`) |
| `SMTP_MAX_CONNECTIONS` | ❌       | `10`    | Max SMTP connections per pool |
| `SMTP_MAX_MESSAGES`    | ❌       | `100`   | Max messages per connection |
| `DEFAULT_SENDER_EMAIL` | ✅       | –       | Default sender email address |
| `DEFAULT_SENDER_NAME`  | ✅       | –       | Default sender display name |

💡 You can store them in a `.env` file and run with:
```bash
docker compose --env-file .env up -d
```

Example `.env`:
```env
PORT=3000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=myuser
SMTP_PASSWORD=mypassword
SMTP_SECURE=false
DEFAULT_SENDER_EMAIL=no-reply@example.com
DEFAULT_SENDER_NAME=My App
```

---

## 📖 API Documentation

Swagger UI is available at:  
👉 `http://localhost:3000/api`

Endpoints:
- `GET /` → Health check  
- `POST /email` → Send an email  
- `POST /mjml` → Convert MJML to HTML  

---

## 🧩 Handlebars Helpers

The service provides several **custom Handlebars helpers** out of the box, so you can use them directly inside your email templates:

| Helper       | Example (Template)                | Result |
|--------------|-----------------------------------|--------|
| `add`        | `{{add 2 3}}`                     | `5` |
| `gt`         | `{{gt 5 3}}`                      | `true` |
| `gte`        | `{{gte 5 5}}`                     | `true` |
| `lt`         | `{{lt 2 5}}`                      | `true` |
| `lte`        | `{{lte 2 2}}`                     | `true` |
| `eq`         | `{{eq "a" "a"}}`                  | `true` |
| `ne`         | `{{ne "a" "b"}}`                  | `true` |
| `or`         | `{{or true false}}`               | `true` |
| `and`        | `{{and true false}}`              | `false` |
| `not`        | `{{not true}}`                    | `false` |
| `contains`   | `{{contains "hello world" "wor"}}`| `true` |
| `startWith`  | `{{startWith "hello" "he"}}`      | `true` |
| `endWith`    | `{{endWith "hello" "lo"}}`        | `true` |
| `replace`    | `{{replace "foo bar" "bar" "baz"}}` | `foo baz` |
| `json`       | `{{json myObject}}`               | `{"key":"value"}` |

👉 Example MJML + Handlebars usage:
```mjml
<mj-text>
  Hello {{name}},  
  You have {{add unreadCount 1}} unread messages.
</mj-text>
```

---

## 🛠 Tech Stack

- [Node.js](https://nodejs.org/)  
- [NestJS](https://nestjs.com/)  
- [MJML](https://mjml.io/)  
- [Handlebars](https://handlebarsjs.com/)  
- [Swagger](https://swagger.io/)  

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
