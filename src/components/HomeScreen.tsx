import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type HomeScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
};

const serviceCategories = [
    "Plumbing",
    "Electrical",
    "Cleaning",
    "Handyman",
    "Gardening",
    "Painting",
];

export function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <scrollView>
            <stackLayout style={styles.container}>
                <label className="text-2xl font-bold text-center mb-4">
                    Welcome to Neighborly
                </label>
                <label className="text-lg text-center mb-4">
                    Find local services in your area
                </label>
                <gridLayout columns="*, *" rows="auto, auto, auto" style={styles.categoryGrid}>
                    {serviceCategories.map((category, index) => (
                        <button
                            key={category}
                            className="btn btn-primary m-2 p-4"
                            row={Math.floor(index / 2)}
                            col={index % 2}
                            onTap={() => navigation.navigate("ServiceList", { category })}
                        >
                            {category}
                        </button>
                    ))}
                </gridLayout>
                <button
                    className="btn btn-outline m-4"
                    onTap={() => navigation.navigate("Profile")}
                >
                    View Profile
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
    categoryGrid: {
        marginTop: 20,
    },
});