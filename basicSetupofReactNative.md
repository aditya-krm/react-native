# 🚀 Getting Started with React Native

Welcome to your journey from web development to the world of React Native! Setting up a React Native project might feel a bit different, but don't worry—I've got you covered. Let's get your project up and running smoothly.

## 1. Creating Your First React Native App

First things first, let's create a new React Native app using Expo. Just run this command in your terminal:

```bash
npx create-expo-app@latest [your-app-name] --template blank@latest
```

This will set up a blank project for you. Easy, right?

## 2. Essential Packages You'll Need

Now that we have our project, let's add some essential packages that will make our lives easier:

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

And some more helpful tools:

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

## 3. Tweaking the package.json

In your package.json file, you'll need to modify the main field like this:

```bash
"main": "expo-router/entry",
```

This change is important to make sure your app starts up correctly with Expo Router.

## 4. Setting Up the App Layout

Next, create a folder named app inside your project directory. Inside this folder, we'll create a file named \_layout.jsx. For now, let's take the content of your App.js and paste it into \_layout.jsx. It might look something like this:

```jsx
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

## 5. Configuring the App

You'll also want to tweak your app.json file by adding this field:

```bash
"scheme": "[your-app-name]"
```

This helps with deep linking and other configuration tasks.

## 6. Building the Root Layout

Your \_layout.jsx file will define the main structure of your app. Here's a simple example:

```jsx
import React from "react";
import { Stack } from "expo-router";

const rootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default rootLayout;
```

This setup uses a Stack navigator from expo-router to manage your screens. The index.jsx file in the app folder will be your entry point.

## 7. Adding Tailwind CSS with NativeWind

Want to style your app with Tailwind CSS just like you do in website development? Let's set up NativeWind. Follow their
[quick start guide](https://www.nativewind.dev/quick-starts/expo) to get started.

Once you're set up, your tailwind.config.js might look like this:

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

And that's it! You're now ready to start building your React Native app. 🎉

If you ever get stuck or need help, don't hesitate to reach out to the React Native community—everyone's super friendly and willing to help. Happy coding! 😊
