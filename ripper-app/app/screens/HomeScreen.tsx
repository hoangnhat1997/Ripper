import { FC } from "react"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { TextStyle, TouchableOpacity, View, ViewStyle, Image, ImageStyle } from "react-native"
import type { ThemedStyle } from "@/theme"
import { Icon, Screen, Text } from "../components"
import { useAppTheme } from "@/utils/useAppTheme"
import { useStores } from "../models"
import { FlatList } from "react-native-gesture-handler"

export const HomeScreen: FC<DemoTabScreenProps<"Home">> = function DemoCommunityScreen(_props) {
  const { themed } = useAppTheme()

  const {
    authenticationStore: { logout },
  } = useStores()

  const activities = [
    {
      id: "1",
      title: "Yoga",
      price: "USD 50/h",
      image: "https://source.unsplash.com/600x400/?yoga",
      icon: "🧘‍♀️",
    },
    {
      id: "2",
      title: "Acrobatics",
      price: "USD 26/h",
      image: "https://source.unsplash.com/600x400/?acrobatics",
      icon: "🤸‍♂️",
    },
    {
      id: "3",
      title: "Archery",
      price: "USD 36/h",
      image: "https://source.unsplash.com/600x400/?archery",
      icon: "🏹",
    },
    {
      id: "4",
      title: "Dance",
      price: "MYR 20/h",
      image: "https://source.unsplash.com/600x400/?dance",
      icon: "💃",
    },
  ]

  const ActivityCard = ({ item }: any) => (
    <View style={themed($card)}>
      <Image source={{ uri: item.image }} style={themed($image)} />
      <View style={themed($overlay)}>
        <Text style={themed($icon)}>{item.icon} </Text>
        <Text style={themed($titleImage)}>{item.title}</Text>
        <Text style={themed($price)}>{item.price}</Text>
      </View>
    </View>
  )

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={themed($container)}>
      <View style={themed($headerContainer)}>
        <TouchableOpacity onPress={logout} style={themed($buttonBackContainer)}>
          <Icon icon="vector" size={30} color="red" />
          <Text style={themed($title)} preset="subheading" text="Home" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={themed($walletContainer)}>
          <Icon icon="wallet" size={24} />
          <Text style={themed($title)} preset="default" text="USD 1000" />
        </TouchableOpacity>
      </View>
      <View style={themed($divider)}></View>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityCard item={item} />}
      />

      {/* <Text
        style={themed($contentContainer)}
        text="There are no programs yet.
Be the first coach to create one!"
      /> */}
    </Screen>
  )
}
const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral100,
  flex: 1,
})

const $headerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  marginLeft: spacing.lg,
  marginRight: spacing.lg,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
})

const $buttonBackContainer: ThemedStyle<ViewStyle> = () => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
})

const $walletContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.wallet,
  padding: spacing.sm,
  borderRadius: spacing.lg,
})

const $title: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginLeft: spacing.sm,
})

const $divider: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral300,
  height: 1,
  marginTop: spacing.md,
  marginBottom: spacing.md,
})

const $contentContainer: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginTop: spacing.md,
})

const $card: ThemedStyle<ViewStyle> = () => ({
  position: "relative",
  borderRadius: 10,
  overflow: "hidden",
  marginBottom: 10,
})

const $image: ThemedStyle<ImageStyle> = () => ({
  width: "100%",
  height: 180,
})

const $overlay: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 10,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
})

const $icon: ThemedStyle<ViewStyle> = () => ({
  fontSize: 24,
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
})

const $titleImage: ThemedStyle<ViewStyle> = () => ({
  fontSize: 24,
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
})

const $price: ThemedStyle<ViewStyle> = () => ({
  fontSize: 24,
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
})
