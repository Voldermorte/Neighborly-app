import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type ProfileScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Profile">,
};

// Mock user data
const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
};

export function ProfileScreen({ navigation }: ProfileScreenProps) {
    return (
        <scrollView>
            <stackLayout style={styles.container}>
                <label className="text-2xl font-bold mb-4">Profile</label>
                
                <label className="font-bold mb-2">Name:</label>
                <label className="mb-4">{mockUser.name}</label>
                
                <label className="font-bold mb-2">Email:</label>
                <label className="mb-4">{mockUser.email}</label>
                
                <label className="font-bold mb-2">Phone:</label>
                <label className="mb-4">{mockUser.phone}</label>
                
                <button
                    className="btn btn-primary mb-4"
                    onTap={() => {
                        // In a real app, this would log the user out
                        console.log("Logging out...");
                        navigation.navigate("Home");
                    }}
                >
                    Log Out
                </button>
            </stackLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 20,
    },
});