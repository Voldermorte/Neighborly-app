import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { getData, storeData } from "../utils/storage";

type ServiceListScreenProps = {
    route: RouteProp<MainStackParamList, "ServiceList">,
    navigation: FrameNavigationProp<MainStackParamList, "ServiceList">,
};

// Mock data for services
const mockServices = [
    { id: "1", name: "John's Plumbing", rating: 4.5 },
    { id: "2", name: "Elite Electricians", rating: 4.8 },
    { id: "3", name: "Clean & Shine", rating: 4.2 },
    { id: "4", name: "Handy Heroes", rating: 4.6 },
    { id: "5", name: "Green Thumb Gardening", rating: 4.7 },
];

export function ServiceListScreen({ route, navigation }: ServiceListScreenProps) {
    const { category } = route.params;
    const [services, setServices] = React.useState([]);

    React.useEffect(() => {
        const loadServices = async () => {
            const storedServices = await getData('services');
            if (storedServices) {
                setServices(storedServices);
            } else {
                // If no stored services, use mock data and store it
                await storeData('services', mockServices);
                setServices(mockServices);
            }
        };
        loadServices();
    }, []);

    return (
        <scrollView>
            <stackLayout style={styles.container}>
                <label className="text-xl font-bold mb-4">
                    {category} Services
                </label>
                {services.map((service) => (
                    <gridLayout key={service.id} columns="*, auto" className="p-2 m-2 border rounded-lg">
                        <stackLayout col={0}>
                            <label className="font-bold">{service.name}</label>
                            <label>Rating: {service.rating}</label>
                        </stackLayout>
                        <button
                            col={1}
                            className="btn btn-primary"
                            onTap={() => navigation.navigate("ServiceDetails", { serviceId: service.id })}
                        >
                            View
                        </button>
                    </gridLayout>
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