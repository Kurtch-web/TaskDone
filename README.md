# 📱 TaskDone - The Ultimate Mobile Task Manager

Welcome to **TaskDone** — a beautiful, animated, productivity-first mobile task manager built with **React Native**, **TypeScript**, and **Styled-Components**.

---

## 🚀 Features

✅ **Smooth Multi-Step Task Creation**
✅ **Support for Subtasks** (Series Tasks)
✅ **Due Dates + Time**
✅ **Priorities: High / Medium / Low**
✅ **Swipeable Sliding Filters** (Priority + Category)
✅ **Overdue / Due Soon / Completed badges**
✅ **Long-Press Selection Mode** for batch deletion
✅ **Dark Mode Ready** *(optional)*
✅ **Modern UI + Fluid Animations**

---

## 🖼️ Screenshots

| Home View                       | Add Task                          | Filters Panel                         |
| ------------------------------- | --------------------------------- | ------------------------------------- |
| ![Home](./screenshots/home.png) | ![Add](./screenshots/addtask.png) | ![Filters](./screenshots/filters.png) |

---

## 🧠 Tech Stack

* ⚛️ **React Native CLI**
* 💅 **Styled Components**
* 🧠 **Context API** for global task state
* 📦 **AsyncStorage** or SQLite (extendable)
* 🔔 Local Notifications *(via expo-notifications or notifee)*
* 📆 Native Date/Time Pickers
* 🎯 Animation with **React Native Animated**

---

## 🔧 Setup

```bash
# 1. Clone this repo
$ git clone https://github.com/Kurtch-web/TaskDone.git
$ cd TaskDone

# 2. Install dependencies
$ npm install

# 3. Start the app (for Android)
$ npx react-native run-android

# or for iOS
$ npx react-native run-ios
```

---

## 🧪 Development Folder Structure

```
src/
├── components/
│   ├── forms/        # Reusable form components
│   ├── hooks/        # Custom hooks
│   ├── lists/        # Task + Category lists
│   └── ui/           # Buttons, Modals, Pickers
├── context/          # Task + Theme context
├── navigation/       # App navigator
├── screens/          # All screen views (Home, AddTask...)
├── services/         # Local storage & notification logic
├── types/            # Shared TypeScript types
├── utils/            # Helper functions
└── App.tsx           # Root app entry
```

---

## ✨ Future Features (Coming Soon)

* 🔁 **Recurring Tasks**
* 📅 **Calendar View**
* 🌩 **Cloud Sync**
* 🎙 **Voice Task Input**
* 📊 **Weekly Productivity Graph**

---

## 🧑‍💻 Author

Made with ❤️ by [@Kurtch-web](https://github.com/Kurtch-web)

> "Built for productivity, styled for elegance."

---

## 📜 License

MIT License — Free to use, modify, and share!

---

## 🌟 Show some love

If you like this project, don’t forget to:

* ⭐ Star the repo
* 🍴 Fork it
* 🧠 Share with your dev friends
