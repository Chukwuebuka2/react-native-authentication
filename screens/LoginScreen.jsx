import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const response = await login(email, password);
      authCtx.authenticate(response.idToken);
      console.log(response.idToken)
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in, Please check your credentials or try again later!"
      );
      setIsAuthenticating(false); 
    }

    console.log("============ This is what I am using ===========");
    console.log(!isAuthenticating, authCtx.isAuthenticated)
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in ..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
