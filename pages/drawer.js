import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import ProfileEdit from "./ProfileEdit";
import LoginScreen from "./LoginScreen";

const RootDrawNav = createDrawerNavigator({
  Edit: {
    screen: ProfileEdit,
  },
  Logout: {
    screen: LoginScreen,
  },
});

export default createAppContainer(RootDrawNav);
