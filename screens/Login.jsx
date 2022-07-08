import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { useAuth } from "../components/GlobalContext";
import CustomInput from "../components/CustomInput";
import axios from "axios";

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .min(8, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required("Password is required"),
});

const Login = ({ navigation }) => {

  const [animating, setAnimating] = useState(true);
  const { getAuthState } = useAuth();

  React.useEffect(() => {
      initialize();
  }, []);

  async function initialize() {
    
      try {
          const {user} = await getAuthState();
          
          if (user) {
              let currentUser = user._id;
              if (currentUser != null) navigation.navigate('TabNavigation');
              else navigation.navigate('Login')

          } else navigation.navigate('Login');
      } catch (e) {
        navigation.navigate('Login');
      }
  }

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(null);

  const { handleLogin } = useAuth();

  const handleSubmit = async (data) => {
    
    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.0.150:8000/api/v1/auth/login",
        data
      );
      
     
      if (response.data.success == true) {
        await handleLogin(response.data);
        navigation.navigate("TabNavigation");
      }
    } catch (err) {
      setErrortext(err.response.data.message);
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
       <View style={styles.second}>
      <Text style={styles.header}>E-V TRACK</Text>
      <Text style={styles.login}>LOGIN</Text>

      <KeyboardAvoidingView style={styles.form}>
        <Formik
          validationSchema={signInValidationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleSubmit, isValid, values }) => (
            <>
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
                style={styles.input}
              />
              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                style={styles.input}
                secureTextEntry
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ paddingTop: 5, color: "white" }}>Sign In</Text>
              </TouchableOpacity>

              {errortext != "" ? (
                <Text style={styles.errorTextStyle}>{errortext}</Text>
              ) : null}

              <View style={styles.footer}>
                <Text>
                  {" "}
                  Don't have an account?{" "}
                  <Text
                    style={{ color: "#FF6F0B", fontWeight: "bold" }}
                    onPress={() => navigation.navigate("Register")}
                  >
                    Sign up
                  </Text>
                </Text>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom:"2%",
    color: "black",
    marginTop: "5%",
    alignSelf: "center",
  },
  form: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF6F0B",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "30%",
    marginVertical: 10,
    borderRadius: 5,
  },
  input:{
    width: "100%",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    paddingLeft:"5%",
    marginVertical: "5%",
  },
  footer: {
    alignSelf: "center",
    marginTop: 20,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  login:{
color: "#FF6F0B",
alignSelf: "center",
  },
  second:{
    width: "80%",
    alignSelf: "center",
    padding: "2%",
    marginTop: "5%",
    borderRadius: 10,
    flexGrow: 1,
    marginBottom: "5%",
    boxShadow:'3px 2px 9px 3px  #cacbcc',
  }
});
