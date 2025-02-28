import { FC, useRef, useState, useMemo, useCallback, useEffect } from "react"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import {
  TextStyle,
  View,
  ViewStyle,
  Image,
  ImageStyle,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { Icon, Screen, Text, Button } from "../components"
import { useAppTheme } from "@/utils/useAppTheme"
import { useStores } from "../models"
import { type ThemedStyle } from "@/theme"
import { activities } from "../../test/mockFile"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import DateTimePicker from "@react-native-community/datetimepicker"
import { use } from "i18next"

interface activitiesProps {
  id: string
  title: string
  price: string
  image: string
  icon: string
}

export const HomeScreen: FC<DemoTabScreenProps<"Home">> = function DemoCommunityScreen(_props) {
  const { themed } = useAppTheme()

  const {
    authenticationStore: { logout },
  } = useStores()

  const bottomSheetRef = useRef<BottomSheet>(null)
  const dateSheetRef = useRef<BottomSheet>(null)
  const hoursSheetRef = useRef<BottomSheet>(null)
  const createBookingSheetRef = useRef<BottomSheet>(null)

  useEffect(() => {
    bottomSheetRef.current?.close()
    dateSheetRef.current?.close()
    hoursSheetRef.current?.close()
    createBookingSheetRef.current?.close()
  }, [])

  const snapPoints = useMemo(() => ["25%", "40%"], [])
  const [selectedItem, setSelectedItem] = useState<activitiesProps>({} as activitiesProps)
  const [date, setDate] = useState(new Date())

  const handleOpenBottomSheet = useCallback((item: (typeof activities)[0]) => {
    setSelectedItem(item)

    bottomSheetRef.current?.expand()
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date
    console.log("onDateChange", currentDate)

    setDate(currentDate)
  }

  const bookingClick = () => {
    bottomSheetRef.current?.close()
    dateSheetRef.current?.expand()
  }

  const dateClick = () => {
    dateSheetRef.current?.close()
    hoursSheetRef.current?.expand()
  }

  const hoursClick = () => {
    hoursSheetRef.current?.close()
    createBookingSheetRef.current?.expand()
  }

  const createBooking = () => {
    createBookingSheetRef.current?.close()
  }

  const ActivityCard = ({ id, title, price, image, icon }: activitiesProps) => (
    <View style={themed($card)}>
      <TouchableOpacity
        onPress={() =>
          handleOpenBottomSheet({
            id,
            title,
            price,
            image,
            icon,
          })
        }
      >
        <Image source={{ uri: image }} style={themed($image)} />
        <View style={themed($overlay)}>
          <View style={themed($titleImageContainer)}>
            <Icon icon={icon} size={24} color="white" />
            <Text style={themed($titleImage)} text={title} />
          </View>
          <Text style={themed($price)} text={price} />
        </View>
      </TouchableOpacity>
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
      {activities.length > 0 ? (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ActivityCard {...item} />}
          contentContainerStyle={themed($contentContainer)}
        />
      ) : (
        <Text
          style={themed($emptyContent)}
          text="There are no programs yet.
Be the first coach to create one!"
        />
      )}
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={-1}
      >
        <BottomSheetView>
          <View style={themed($bottomSheetContent)}>
            <View style={themed($bottomSheetHeader)}>
              <Icon icon={selectedItem.icon} size={48} color="orange" />
              <View style={themed($bottomSheetName)}>
                <Text>{selectedItem.title}</Text>
                <Text>Ayah Green</Text>
              </View>
            </View>
            <Text>
              Transform your body and mind with our 90-minute Bikram Yoga session, featuring 26
              postures and breathing exercises. Join us to enhance strength, flexibility, and
              clarity while cultivating balance and vitality!
            </Text>
          </View>

          <View style={themed($dividerBottom)}></View>
          <View style={themed($bottomSheetButton)}>
            <Text>Hourly Rate</Text>
            <Text size="xl" weight="bold">
              {selectedItem.price}
            </Text>
            <Button
              text="Booking"
              style={themed($tapButton)}
              preset="reversed"
              onPress={bookingClick}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet
        enablePanDownToClose
        ref={dateSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={-1}
      >
        <BottomSheetView>
          <View>
            <Text preset="subheading" style={themed($headerTime)}>
              Select Day
            </Text>
          </View>
          <DateTimePicker value={date} mode="datetime" display="inline" onChange={onDateChange} />
          <View style={themed($dividerBottom)}></View>
          <View style={themed($bottomSheetButton)}>
            <Button text="Next" style={themed($tapButton)} preset="reversed" onPress={dateClick} />
          </View>
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet
        enablePanDownToClose
        ref={hoursSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={-1}
      >
        <BottomSheetView>
          <View>
            <Text preset="subheading" style={themed($headerTime)}>
              Select Start Time
            </Text>
          </View>
          <DateTimePicker value={date} mode="time" display="spinner" onChange={onDateChange} />
          <View style={themed($dividerBottom)}></View>
          <View style={themed($bottomSheetButton)}>
            <Button text="Next" style={themed($tapButton)} preset="reversed" onPress={hoursClick} />
          </View>
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet
        enablePanDownToClose
        ref={createBookingSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={-1}
      >
        <BottomSheetView>
          <View>
            <Text preset="subheading" style={themed($headerTime)}>
              Review
            </Text>
          </View>
          <View style={themed($reviewContainer)}>
            <Text text="Sport" weight="bold" size="md" />
            <Icon icon={selectedItem.icon} size={24} color="orange" style={themed($reviewText)} />
            <Text
              text={selectedItem.title}
              weight="normal"
              size="md"
              style={themed($bottomSheetName)}
            />
          </View>
          <View style={themed($reviewContainer)}>
            <Text text="Coach" weight="bold" size="md" />
            <Text text="Ayah Green" weight="normal" size="md" style={themed($reviewText)} />
          </View>
          <View style={themed($reviewContainer)}>
            <Text text="Date" weight="bold" size="md" />
            <Text text="01/03/2025" weight="normal" size="md" style={themed($reviewText)} />
          </View>
          <View style={themed($reviewContainer)}>
            <Text text="Time" weight="bold" size="md" />
            <Text text="15:00 - 16:30" weight="normal" size="md" style={themed($reviewText)} />
          </View>
          <View style={themed($reviewContainer)}>
            <Text text="Price" weight="bold" size="md" />
            <Text text={selectedItem.price} weight="bold" size="xl" style={themed($reviewText)} />
          </View>
          <View style={themed($dividerBottom)}></View>
          <View style={themed($bottomSheetButton)}>
            <Button
              text="Create Booking"
              style={themed($tapButton)}
              preset="reversed"
              onPress={createBooking}
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
  marginBottom: spacing.md,
})

const $card: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: spacing.md,
  overflow: "hidden",
  marginBottom: spacing.md,
})

const $image: ThemedStyle<ImageStyle> = () => ({
  width: "100%",
  height: 180,
})

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginHorizontal: spacing.lg,
})

const $emptyContent: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginTop: spacing.md,
})

const $overlay: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: spacing.sm,
})

const $titleImageContainer: ThemedStyle<TextStyle> = () => ({
  flex: 1,
  flexDirection: "row",
})

const $icon: ThemedStyle<TextStyle> = () => ({
  fontSize: 24,
  color: "white",
})

const $titleImage: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.palette.neutral100,
  marginLeft: spacing.sm,
})

const $price: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})
const $bottomSheetContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
  marginHorizontal: spacing.md,
  // alignItems: "center",
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $dividerBottom: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral300,
  height: 1,
  marginTop: spacing.md,
  marginBottom: spacing.md,
})

const $bottomSheetHeader: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  display: "flex",
  flexDirection: "row",
  marginBottom: spacing.md,
})
const $bottomSheetButton: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  marginHorizontal: spacing.md,
})
const $bottomSheetName: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  marginLeft: spacing.md,
})
const $headerTime: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
})

const $reviewContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: spacing.md,
})

const $reviewText: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  marginLeft: spacing.xl,
})
