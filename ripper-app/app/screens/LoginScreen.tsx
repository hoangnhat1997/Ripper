import { observer } from "mobx-react-lite"
import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, TouchableOpacity, ViewStyle, Image, ImageStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { api } from "@/services/api"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

const logoMobile = require("../../assets/images/logo-mobile.png")

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const { navigation } = _props

  function goSignUp() {
    navigation.navigate("SignUp")
  }

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("")
    setAuthPassword("")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [setAuthEmail])

  const error = isSubmitted ? validationError : ""

  const login = async () => {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    await api
      .logIn(authEmail, authPassword)
      .then((res) => {
        if (res.kind !== "ok") {
          return
        }
        setIsSubmitted(false)
        setAuthPassword("")
        setAuthEmail("")

        setAuthToken(res.response)
      })
      .catch((error) => {
        console.log("Error signing up", error)
      })

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

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
      <Text testID="login-heading" tx="loginScreen:logIn" preset="heading" style={themed($logIn)} />
      <Text
        text="Welcome back! Let’s get you set up on the app."
        preset="subheading"
        weight="normal"
        style={themed($enterDetails)}
      />
      {attemptsCount > 2 && (
        <Text tx="loginScreen:hint" size="sm" weight="light" style={themed($hint)} />
      )}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen:emailFieldLabel"
        placeholderTx="loginScreen:emailFieldPlaceholder"
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
        labelTx="loginScreen:passwordFieldLabel"
        placeholderTx="loginScreen:passwordFieldPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        text="Log In"
        style={themed($tapButton)}
        preset="reversed"
        onPress={login}
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
        Don’t have an account?{" "}
        <TouchableOpacity style={themed($containerSignUp)} onPress={goSignUp}>
          <Text style={themed($textSignUp)} size="lg" weight="bold">
            Sign Up
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
