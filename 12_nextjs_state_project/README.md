# 📝 Todo App — Architecture & Flow

This Todo App is built with **Next.js, MongoDB, Mongoose, Zod, and TanStack Query**.

## 🏗️ Overall Architecture

```text
                    ┌─────────────────────┐
                    │      HOME PAGE      │
                    │      page.jsx       │
                    └──────────┬──────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
      ┌───────────────┐                 ┌───────────────┐
      │   TodoForm    │                 │   TodoList    │
      │  "use client" │                 │  "use client" │
      └───────┬───────┘                 └───────┬───────┘
              │                                 │
              │ useMutation                     │ useQuery
              ▼                                 ▼
       ┌─────────────┐                    ┌─────────────┐
       │  addTodo()  │                    │ getTodos()  │
       │Server Action│                    │Server Action│
       └──────┬──────┘                    └──────┬──────┘
              │                                 │
              └──────────────┬──────────────────┘
                             ▼
                    ┌─────────────────┐
                    │     Mongoose    │
                    │   Todo Model    │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     MongoDB     │
                    └─────────────────┘
```

## 📥 Read Todo Flow

```text
User opens page
       │
       ▼
   TodoList
       │
       ▼
   useQuery()
       │
       ▼
   getTodos()
       │
       ▼
   ConnectDB()
       │
       ▼
    MongoDB
       │
       ▼
   Todo.find()
       │
       ▼
  Todos Array
       │
       ▼
TanStack Query Cache
       │
       ▼
   TodoList
       │
       ▼
      UI
```

## ➕ Add Todo Flow

```text
User enters Todo
       │
       ▼
   TodoForm
       │
       ▼
mutation.mutate()
       │
       ▼
    addTodo()
       │
       ▼
Zod Validation
       │
       ▼
  Todo.create()
       │
       ▼
    MongoDB
       │
       ▼
    Success
       │
       ▼
  onSuccess()
       │
       ▼
invalidateQueries(["todos"])
       │
       ▼
     Refetch
       │
       ▼
   getTodos()
       │
       ▼
 Fresh Todos
       │
       ▼
 TanStack Cache
       │
       ▼
      UI
```

## ☑️ Toggle Todo Flow

```text
User clicks Checkbox
        │
        ▼
    TodoItem
        │
        ▼
      toggle()
        │
        ▼
   useMutation
        │
        ▼
   toggleTodo()
        │
        ▼
     MongoDB
        │
        ▼
 Update completed
        │
        ▼
     Success
        │
        ▼
    onSuccess()
        │
        ▼
invalidateQueries(["todos"])
        │
        ▼
      Refetch
        │
        ▼
    getTodos()
        │
        ▼
  Fresh Todos
        │
        ▼
   Cache Update
        │
        ▼
       UI
```

## 🗑️ Delete Todo Flow

```text
User clicks Delete
        │
        ▼
    TodoItem
        │
        ▼
      remove()
        │
        ▼
   useMutation
        │
        ▼
   deleteTodo()
        │
        ▼
     MongoDB
        │
        ▼
   Todo Deleted
        │
        ▼
     Success
        │
        ▼
    onSuccess()
        │
        ▼
invalidateQueries(["todos"])
        │
        ▼
      Refetch
        │
        ▼
    getTodos()
        │
        ▼
   Fresh Todos
        │
        ▼
   Cache Update
        │
        ▼
       UI
```

## 🧠 TanStack Query — Core Flow

```text
                TANSTACK QUERY
                     │
          ┌──────────┴──────────┐
          │                     │
       useQuery             useMutation
          │                     │
          ▼                     ▼
      READ DATA           CHANGE DATA
          │                     │
          ▼             ┌───────┼────────┐
      getTodos()         │       │        │
                        ▼       ▼        ▼
                     addTodo  toggle   delete
                        │       │        │
                        └───────┼────────┘
                                ▼
                           onSuccess()
                                │
                                ▼
                    invalidateQueries()
                                │
                                ▼
                             Refetch
                                │
                                ▼
                           Fresh Data
                                │
                                ▼
                                UI
```

## 🔥 Complete Application Flow

```text
UI
 │
 ▼
TanStack Query
 │
 ├── useQuery ──────────► getTodos()
 │
 └── useMutation ───────► addTodo()
                         toggleTodo()
                         deleteTodo()
                              │
                              ▼
                         Server Action
                              │
                              ▼
                           Mongoose
                              │
                              ▼
                           MongoDB
                              │
                              ▼
                         Database Result
                              │
                              ▼
                       TanStack Query
                              │
                              ▼
                            Cache
                              │
                              ▼
                              UI
```

### 🔄 Mutation-এর পরে

```text
Create / Update / Delete
          │
          ▼
    Database Changed
          │
          ▼
     onSuccess()
          │
          ▼
invalidateQueries(["todos"])
          │
          ▼
        Refetch
          │
          ▼
     Fresh Data
          │
          ▼
        Cache
          │
          ▼
          UI
```