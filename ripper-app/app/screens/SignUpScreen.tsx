import { observer } from "mobx-react-lite"
import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, TouchableOpacity, ViewStyle, Image, ImageStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { api } from "../services/api"

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}

const logoMobile = require("../../assets/images/logo-mobile.png")

export const SignUpScreen: FC<SignUpScreenProps> = observer(function SignUpScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [authFullName, setAuthFullName] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, validationError },
  } = useStores()

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const { navigation } = _props

  function goLogin() {
    navigation.navigate("Login")
  }

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthFullName("")
    setAuthEmail("")
    setAuthPassword("")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
      setAuthFullName("")
    }
  }, [setAuthEmail])

  const error = isSubmitted ? validationError : ""

  const signup = async () => {
    // write call api to sign up

    if (!authFullName || !authEmail || !authPassword) {
      return
    }
    await api
      .signUp(authFullName, authEmail, authPassword)
      .then((res) => {
        if (res.kind !== "ok") {
          return
        }
        setIsSubmitted(false)
        setAuthPassword("")
        setAuthEmail("")

        goLogin()
      })
      .catch((error) => {
        console.log("Error signing up", error)
      })

    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.

    // We'll mock this with a fake token.
    // setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden, colors.palette.neutral800],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Image source={logoMobile} style={themed($logo)} />

      <Text text="Sign Up" preset="heading" style={themed($logIn)} />
      <Text
        text="Welcome! Let’s create your account."
        preset="subheading"
        weight="normal"
        style={themed($enterDetails)}
      />
      {attemptsCount > 2 && (
        <Text tx="loginScreen:hint" size="sm" weight="light" style={themed($hint)} />
      )}

      <TextField
        value={authFullName}
        onChangeText={setAuthFullName}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="name"
        autoCorrect={false}
        labelTx="signUpScreen:fullNameLabel"
        placeholderTx="signUpScreen:fullNamePlaceholder"
        helper={error}
        status={error ? "error" : undefined}
      />

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="signUpScreen:emailFieldLabel"
        placeholderTx="signUpScreen:emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="signUpScreen:passwordFieldLabel"
        placeholderTx="signUpScreen:passwordFieldPlaceholder"
        onSubmitEditing={signup}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        text="Sign Up"
        style={themed($tapButton)}
        preset="reversed"
        onPress={signup}
      />

      <Text style={themed($textSub)} size="xs">
        By continuing, you agree to our{" "}
        <Text size="xs" weight="bold">
          Terms
        </Text>{" "}
        and{" "}
        <Text size="xs" weight="bold">
          Privacy Policy
        </Text>
        .
      </Text>

      <Text style={themed($textContainerSub)} size="md" weight="bold">
        Already have an account?{" "}
        <TouchableOpacity style={themed($containerSignUp)} onPress={goLogin}>
          <Text style={themed($textSignUp)} size="lg" weight="bold">
            Log In
          </Text>
        </TouchableOpacity>
      </Text>
    </Screen>
  )
})

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $logIn: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $enterDetails: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $hint: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.md,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $textSub: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.sm,
  marginBottom: spacing.sm,
  textAlign: "center",
  color: colors.palette.neutral500,
})

const $textContainerSub: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  textAlign: "center",
})

const $containerSignUp: ThemedStyle<ViewStyle> = () => ({
  height: 30,
})

const $textSignUp: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.blue,
  alignItems: "center",
})

const $logo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  display: "flex",
  alignSelf: "center",
  marginBottom: spacing.xxl,
  height: 84,
  width: 134,
})
