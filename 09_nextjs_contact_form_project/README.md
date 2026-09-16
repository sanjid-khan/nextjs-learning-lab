
## 🔄 Contact Form Flow


                    USER
                     │
                     │ 1. Fill Form
                     ▼
        ┌─────────────────────────┐
        │     ContactForm.js      │
        │     "use client"        │
        └────────────┬────────────┘
                     │
                     │ 2. Submit
                     ▼
        ┌─────────────────────────┐
        │     Server Action       │
        │    createContact()      │
        │   actions/contact.js    │
        └────────────┬────────────┘
                     │
                     │ 3. connectDB()
                     ▼
        ┌─────────────────────────┐
        │        MongoDB          │
        │        Contact          │
        │         Model           │
        └────────────┬────────────┘
                     │
                     │ 4. Contact.create()
                     ▼
        ┌─────────────────────────┐
        │    Contact Document     │
        │                         │
        │  name                   │
        │  email                  │
        │  message                │
        │  status: "pending"      │
        └────────────┬────────────┘
                     │
                     │ 5. redirect()
                     ▼
              ┌──────────────┐
              │  /dashboard  │
              └──────┬───────┘
                     │
                     │ 6. Server fetch
                     ▼
        ┌─────────────────────────┐
        │    dashboard/page.js    │
        │                         │
        │  await connectDB()      │
        │  Contact.find()         │
        └────────────┬────────────┘
                     │
                     │ 7. Contact data
                     ▼
        ┌─────────────────────────┐
        │    Contact Messages     │
        │                         │
        │  Name                   │
        │  Email                  │
        │  Message                │
        │  Status                 │
        └────────────┬────────────┘
                     │
                     ▼
                    USER


## 🟢 Mark Resolved Flow

USER clicks "Mark Resolved"
             │
             ▼
┌─────────────────────────┐
│   StatusButton.js       │
│                         │
│ updateStatus.bind()     │
└────────────┬────────────┘
             │
             │ Server Action
             ▼
┌─────────────────────────┐
│    updateStatus(id)     │
│                         │
│    connectDB()          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        MongoDB          │
│                         │
│ findByIdAndUpdate(id)   │
│ status → "resolved"     │
└────────────┬────────────┘
             │
             │ revalidatePath()
             ▼
┌─────────────────────────┐
│       /dashboard        │
│                         │
│ Server Component        │
│ re-renders with data    │
└────────────┬────────────┘
             │
             ▼
        🟢 RESOLVED




## 🧠 Overall Architecture

Browser
   │
   ▼
Client Component
   │
   │ Server Action
   ▼
Server Action
   │
   ▼
MongoDB
   │
   ▼
Server Component
   │
   ▼
UI


## ⚡ Traditional API vs Server Actions

Traditional:

Form
  ↓
API Route
  ↓
Controller
  ↓
Database


Next.js Server Actions:

Form
  ↓
Server Action
  ↓
Database
````

