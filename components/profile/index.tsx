import { mainStore, userStore, setItem, getItem } from "@/utils/localforage";

// Example usage in a React component
const MyComponent = () => {
  const saveUserData = async () => {
    const userData = {
      id: 1,
      name: "John Doe",
      preferences: { theme: "dark" },
    };

    try {
      await setItem(userStore, "currentUser", userData);
      console.log("User data saved successfully");
    } catch (error) {
      console.error("Failed to save user data");
    }
  };

  const loadUserData = async () => {
    const defaultUser = { id: 0, name: "", preferences: { theme: "light" } };
    try {
      const userData = await getItem(userStore, "currentUser", defaultUser);
      console.log("User data loaded:", userData);
    } catch (error) {
      console.error("Failed to load user data");
    }
  };

  return <div>123</div>;
};
