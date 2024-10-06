import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { Dialogs } from "@nativescript/core";

type BookServiceScreenProps = {
    route: RouteProp<MainStackParamList, "BookService">,
    navigation: FrameNavigationProp<MainStackParamList, "BookService">,
};

export function BookServiceScreen({ route, navigation }: BookServiceScreenProps) {
    const { serviceId } = route.params;
    const [date, setDate] = React.useState(new Date());
    const [description, setDescription] = React.useState("");

    const handleBooking = () => {
        // In a real app, you would send this data to your backend
        console.log("Booking service", { serviceId, date, description });
        Dialogs.alert({
            title: "Booking Confirmed",
            message: "Your service has been booked successfully!",
            okButtonText: "OK"
        }).then(() => {
            navigation.navigate("Home");
        });
    };

    return (
        <scrollView>
            <stackLayout style={styles.container}>
                <label className="text-xl font-bold mb-4">Book Service</label>
                
                <label className="mb-2">Select Date:</label>
                <datePicker
                    date={date}
                    onDateChange={(args) => setDate(args.value)}
                    className="mb-4"
                />

                <label className="mb-2">Description of work needed:</label>
                <textView
                    text={description}
                    onTextChange={(args) => setDescription(args.value)}
                    hint="Enter description here..."
                    className="mb-4 p-2 border rounded"
                />

                <button
                    className="btn btn-primary"
                    onTap={handleBooking}
                >
                    Confirm Booking
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