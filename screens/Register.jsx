import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Pressable
} from "react-native";
import React,{useState} from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import axios from "axios";

const signUpValidationSchema = yup.object().shape({
  names: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Full name is required'),
  phone_number: yup
    .string()
    .matches(/(07)(\d){8}\b/, 'Enter a valid phone number')
    .required('Phone number is required'),
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .min(8, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required('Password is required')
})

const Register = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [errortext, setErrortext] = React.useState(null);

  const handleSubmit = async (data) => {
    
    setLoading(true);
    try {
      const response = await axios.post("http://192.168.0.229:8000/api/v1/users",data);

      if(response.data.success == true){
        navigation.navigate("Login");
      }
    } catch (err) {
      setErrortext(err.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.second}>

      <Text style={styles.header}>E-V TRACK</Text>
      <Text style={styles.login}>LOGIN</Text>

      <KeyboardAvoidingView style={styles.form}>
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              names: '',
              email: '',
              phone_number: '',
              password: ''
            }}
            onSubmit={values => handleSubmit(values)}
          >
            {({ handleSubmit, isValid, values }) => (
              <>
                <Field
                  component={CustomInput}
                  name="names"
                  placeholder="Full Name"
                  style={styles.input}
                />
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                  style={styles.input}
                />
                <Field
                  component={CustomInput}
                  name="phone_number"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                  style={styles.input}
                />
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  style={styles.input}
                  secureTextEntry
                />
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={{ paddingTop: 5, color: "white" }}>
                      Sign Up
                    </Text>
                </Pressable>

                <View style={styles.footer}>
                  <Text>
                    {" "}
                    Already have an account?{" "}
                    <Text
                      style={{ color: "#FF6F0B", fontWeight: "bold" }}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Sign In
                    </Text>
                  </Text>
                </View>
              </>
            )}
          </Formik>
      
      </KeyboardAvoidingView>
      </View>
      </SafeAreaView>
  );
};

export default Register;

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
