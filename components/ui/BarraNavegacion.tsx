import { View, TouchableOpacity, StyleSheet, Platform, Dimensions } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const PRIMARY_COLOR = "#130057";
const SECONDARY_COLOR = "#fff";

const { width: screenWidth } = Dimensions.get("window");

const BarraNavegacion: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                if (["_sitemap", "+not-found"].includes(route.name)) return null;

                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <AnimatedTouchableOpacity
                        layout={LinearTransition.springify().mass(0.5)}
                        key={route.key}
                        onPress={onPress}
                        style={[
                            styles.tabItem,
                            { backgroundColor: isFocused ? SECONDARY_COLOR : "transparent" },
                        ]}
                    >
                        {getIconByRouteName(route.name, isFocused ? PRIMARY_COLOR : SECONDARY_COLOR)}
                        {isFocused && (
                            <Animated.Text
                                entering={FadeIn.duration(200)}
                                exiting={FadeOut.duration(200)}
                                style={styles.text}
                            >
                                {typeof label === 'string' ? label : label({ focused: isFocused, color: PRIMARY_COLOR, position: 'below-icon', children: '' })}
                            </Animated.Text>
                        )}
                    </AnimatedTouchableOpacity>
                );
            })}
        </View>
    );

    function getIconByRouteName(routeName: string, color: string) {
        switch (routeName) {
            case "index":
                return <Feather name="home" size={18} color={color} />;
            case "historial":
                return <Ionicons name="time-outline" size={18} color={color} />; // Icono de historial
            case "predicciones":
                return <Feather name="pie-chart" size={18} color={color} />;
            case "ajustes":
                return <Ionicons name="settings-outline" size={18} color={color} />; // Icono de ajustes
            default:
                return <Feather name="home" size={18} color={color} />;
        }
    }
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: PRIMARY_COLOR,
        alignSelf: "center",
        width: screenWidth - 10,
        bottom: Platform.OS === "web" ? 10 : 10,
        borderRadius: 50,
        paddingHorizontal: Platform.OS === "web" ? 20 : 12,
        paddingVertical: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    tabItem: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 36,
        paddingHorizontal: Platform.OS === "web" ? 20 : 13,
        borderRadius: 30,
    },
    text: {
        color: PRIMARY_COLOR,
        marginLeft: 8,
        fontWeight: "500",
        fontSize: Platform.OS === "web" ? 16 : 14,
    },
});

export default BarraNavegacion;