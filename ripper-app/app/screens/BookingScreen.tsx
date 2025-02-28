import { FC, useState, useEffect, useMemo, useRef, useCallback } from "react"
import { Icon, Screen, Text, Button } from "../components"
import { useAppTheme } from "@/utils/useAppTheme"

import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { ThemedStyle } from "../theme"
import {
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
  FlatList,
  Image,
  ImageStyle,
} from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import { activities } from "../../test/mockFile"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"

interface activitiesProps {
  id: string
  title: string
  price: string
  image: string
  icon: string
}
export const BookingScreen: FC<DemoTabScreenProps<"Booking">> = function DemoCommunityScreen(
  _props,
) {
  const { themed } = useAppTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)

  useEffect(() => {
    bottomSheetRef.current?.close()
  }, [])
  const snapPoints = useMemo(() => ["25%", "40%"], [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const deleteClick = () => {
    bottomSheetRef.current?.expand()
  }

  const buttonNoClick = () => {
    bottomSheetRef.current?.close()
  }

  const buttonYesClick = () => {
    bottomSheetRef.current?.close()
  }

  const ActivityItem = ({ id, title, price, image, icon }: activitiesProps) => (
    <View style={themed($itemContainer)}>
      <Icon icon={icon} size={38} color="black" />

      <View style={themed($overlay)}>
        <View>
          <Text style={themed($titleImage)} text={title} />
          <Text style={themed($titleImage)} text={title} />
        </View>
        <View>
          <Text style={themed($price)} text={price} />
          <Text style={themed($price)} text={price} />
        </View>
      </View>
      <TouchableOpacity style={themed($deleteIcon)} onPress={deleteClick}>
        <Icon icon="trash" size={16} color="red" />
      </TouchableOpacity>
    </View>
  )

  const FirstRoute = () => (
    <View>
      {activities.length > 0 ? (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ActivityItem {...item} />}
          contentContainerStyle={themed($contentContainer)}
        />
      ) : (
        <Text style={themed($emptyContent)} text="You don’t have any upcoming bookings." />
      )}
    </View>
  )

  const SecondRoute = () => (
    <View>
      {activities.length > 0 ? (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ActivityItem {...item} />}
          contentContainerStyle={themed($contentContainer)}
        />
      ) : (
        <Text style={themed($emptyContent)} text="You don’t have any past bookings." />
      )}
    </View>
  )

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  })

  const routes = [
    { key: "first", title: "UPCOMMING" },
    { key: "second", title: "HISTORY" },
  ]

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={themed($tabContainer)}
      style={themed($tabContainer)}
      labelStyle={themed($tabViewText)}
      inactiveColor={themed($tabViewContainer)}
      tabStyle={themed($tabViewContainer)}
    />
  )

  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)

  return (
    <Screen preset="fixed" contentContainerStyle={themed($container)} safeAreaEdges={["top"]}>
      <View style={themed($headerContainer)}>
        <View style={themed($buttonBackContainer)}>
          <Text style={themed($title)} preset="subheading" text="Bookings" />
        </View>
        <TouchableOpacity onPress={() => {}} style={themed($walletContainer)}>
          <Icon icon="wallet" size={24} />
          <Text style={themed($title)} preset="default" text="USD 1000" />
        </TouchableOpacity>
      </View>
      <View style={themed($divider)}></View>
      <View style={themed($tabViewContainer)}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          // renderTabBar={renderTabBar}
        />
      </View>
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={-1}
      >
        <BottomSheetView>
          <View style={themed($bottomSheetContent)}>
            <Text preset="subheading" style={themed($headerBottomSheet)}>
              Confirm Cancellation
            </Text>
            <Text>
              You are about to cancel your Yoga session on 16/12/2024 from 15:00 to 16:00 with Ayah
              Green.
            </Text>
            <Text>The booking fee will be fully refunded. This action cannot be undone.</Text>

            <Text>Are you sure you wish to cancel this session?</Text>
          </View>
          <View style={themed($bottomSheetButton)}>
            <Button
              text="No"
              style={themed($tapButtonNo)}
              preset="reversed"
              onPress={buttonNoClick}
            />
            <Button
              text="Yes"
              style={themed($tapButtonYes)}
              preset="reversed"
              onPress={buttonYesClick}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
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
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
})

const $buttonBackContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
})

const $walletContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.wallet,
  padding: spacing.sm,
  borderRadius: spacing.lg,
})
const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginLeft: spacing.sm,
})
const $divider: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral300,
  height: 1,
  marginTop: spacing.md,
  marginBottom: spacing.xs,
})
const $tabViewContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flex: 1,
  backgroundColor: colors.palette.neutral100,
})

const $tabContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  // flexDirection: "row",
  // justifyContent: "space-between",
  backgroundColor: colors.palette.neutral100,
})

const $tabViewText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.ripper,
})

const $emptyContent: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginTop: spacing.md,
})
const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginHorizontal: spacing.lg,
})

const $itemContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginVertical: spacing.md,
  borderRadius: spacing.md,
  borderColor: colors.palette.neutral300,
  borderWidth: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: 80,
  overflow: "hidden",
})
const $overlay: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: spacing.sm,
})

const $titleImageContainer: ThemedStyle<TextStyle> = () => ({
  flex: 1,
  flexDirection: "row",
})

const $titleImage: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral800,
  marginLeft: spacing.sm,
})

const $price: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral800,
})
const $deleteIcon: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  height: "100%",
  width: 40,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.palette.surfaceDetele,
})
const $headerBottomSheet: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
})
const $bottomSheetContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
  marginHorizontal: spacing.md,
  // alignItems: "center",
})

const $bottomSheetButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginBottom: spacing.md,
  marginHorizontal: spacing.md,
})

const $tapButtonNo: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginTop: spacing.xs,
  backgroundColor: colors.palette.neutral300,
  width: "40%",
})

const $tapButtonYes: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
  backgroundColor: "red",
  width: "40%",
})
