import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      Alert.alert("Error", "Please fill all the fields");
    }
    if (form.password.length < 8) {
      Alert.alert("Error", "Password must be atleast 8 characters long");
    }
    setLoading(true);

    try {
      if (form.password !== form.confirmPassword) {
        Alert.alert("Error", "Password and Confirm Password need to be same");
        return;
      }
      const result = await createUser(form.email, form.password, form.username);
      //set it in the global context
      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error in creating user");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-full justify-center px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">
            Sign Up to Aora
          </Text>
          <FormField
            title="username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            type="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Confirm Password"
            type="Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            containerStyles="mt-7"
            handlePress={submit}
            isLoading={loading}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-white text-base font-pmedium mt-4">
              have an account already?{" "}
              <Link
                href="/sign-in"
                className="text-secondary text-lg font-semibold"
              >
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
