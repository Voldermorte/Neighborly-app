import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type ServiceDetailsScreenProps = {
    route: RouteProp<MainStackParamList, "ServiceDetails">,
    navigation: FrameNavigationProp<MainStackParamList, "ServiceDetails">,
};

// Mock data for service details
const mockServiceDetails = {
    id: "1",
    name: "John's Plumbing",
    rating: 4.5,
    description: "Professional plumbing services with 10+ years of experience.",
    reviews: [
        { id: "1", user: "Alice", rating: 5, comment: "Excellent service!" },
        { id: "2", user: "Bob", rating: 4, comment: "Good work, slightly pricey." },
    ],
};

export function ServiceDetailsScreen({ route, navigation }: ServiceDetailsScreenProps) {
    const { serviceId } = route.params;
    const service = mockServiceDetails; // In a real app, fetch the service details based on serviceId

    return (
        <scrollView>
            <stackLayout style={styles.container}>
                <label className="text-2xl font-bold mb-2">{service.name}</label>
                <label className="text-lg mb-2">Rating: {service.rating}</label>
                <label className="mb-4">{service.description}</label>
                
                <button
                    className="btn btn-primary mb-4"
                    onTap={() => navigation.navigate("BookService", { serviceId: service.id })}
                >
                    Book Service
                </button>

                <label className="text-xl font-bold mb-2">Reviews</label>
                {service.reviews.map((review) => (
                    <stackLayout key={review.id} className="p-2 m-2 border rounded-lg">
                        <label className="font-bold">{review.user}</label>
                        <label>Rating: {review.rating}</label>
                        <label>{review.comment}</label>
                    </stackLayout>
                ))}
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