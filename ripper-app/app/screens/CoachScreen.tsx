import { FC, useState, useEffect, useMemo, useRef, useCallback } from "react"
import { Icon, Screen, Text, Button, TextField } from "../components"
import { useAppTheme } from "@/utils/useAppTheme"

import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { ThemedStyle } from "../theme"
import { TextStyle, TouchableOpacity, View, ViewStyle, FlatList, ImageStyle } from "react-native"
import { activities } from "../../test/mockFile"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { de } from "date-fns/locale"
import { TextInput } from "react-native-gesture-handler"

interface activitiesProps {
  id: string
  title: string
  price: string
  image: string
  icon: string
}
export const CoachScreen: FC<DemoTabScreenProps<"Coach">> = function DemoCommunityScreen(_props) {
  const { themed } = useAppTheme()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const detailsSheetRef = useRef<BottomSheet>(null)

  const [selectedId, setSelectedId] = useState("")

  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  const handlePress = (id: string) => {
    setSelectedId(id)
  }

  useEffect(() => {
    bottomSheetRef.current?.close()
    detailsSheetRef.current?.close()
  }, [])
  const snapPoints = useMemo(() => ["25%", "40%"], [])
  const authPasswordInput = useRef<TextInput>(null)

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const deleteClick = () => {
    bottomSheetRef.current?.expand()
  }
  const editClick = () => {
    bottomSheetRef.current?.expand()
  }

  const createClick = () => {
    bottomSheetRef.current?.expand()
  }

  const buttonNoClick = () => {
    bottomSheetRef.current?.close()
  }

  const buttonNextClick = () => {
    bottomSheetRef.current?.close()
    detailsSheetRef.current?.expand()
  }

  const onPressEnterDetails = () => {
    bottomSheetRef.current?.close()
  }

  const ActivityItem = ({ id, title, price, image, icon }: activitiesProps) => (
    <View style={themed($itemContainer)}>
      <Icon icon={icon} size={38} color="black" />

      <View style={themed($overlay)}>
        <View>
          <Text style={themed($titleImage)} text={title} weight="bold" />
          <Text style={themed($titleImage)} text={price} weight="thin" />
        </View>
      </View>
      <View style={themed($dividerVertical)}></View>
      <TouchableOpacity style={themed($editIcon)} onPress={editClick}>
        <Icon icon="edit" size={16} color="black" />
      </TouchableOpacity>
      <View style={themed($dividerVertical)}></View>

      <TouchableOpacity style={themed($deleteIcon)} onPress={deleteClick}>
        <Icon icon="trash" size={16} color="red" />
      </TouchableOpacity>
    </View>
  )

  const SelectActivityItem = ({
    id,
    title,
    price,
    image,
    isSelected,
    icon,
    onPress,
  }: activitiesProps & { isSelected: boolean; onPress: () => void }) => (
    <TouchableOpacity
      style={[themed($selectItemContainer), isSelected && themed($selectedItemContainer)]}
      onPress={onPress}
    >
      <Icon icon={icon} size={28} color="black" />
      <Text style={themed($titleImage)} text={title} weight="bold" />
    </TouchableOpacity>
  )

  return (
    <Screen preset="fixed" contentContainerStyle={[themed($container)]} safeAreaEdges={["top"]}>
      <View style={themed($headerContainer)}>
        <View style={themed($buttonBackContainer)}>
          <Text style={themed($title)} preset="subheading" text="Your Programs" />
        </View>
        <View style={themed($headerRightContainer)}>
          <TouchableOpacity onPress={() => {}} style={themed($walletContainer)}>
            <Icon icon="wallet" size={24} />
            <Text style={themed($title)} preset="default" text="USD 1000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              createClick()
            }}
            style={themed($buttonPlusContainer)}
          >
            <Icon icon="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={themed($divider)}></View>
      <View style={themed($tabViewContainer)}>
        {activities.length > 0 ? (
          <FlatList
            data={activities}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ActivityItem {...item} />}
            contentContainerStyle={themed($contentContainer)}
          />
        ) : (
          <Text
            style={themed($emptyContent)}
            text="You don’t have any programs.
Press the + button to create one."
          />
        )}
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
              Select Sport
            </Text>
            <FlatList
              data={activities}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SelectActivityItem
                  {...item}
                  isSelected={selectedId === item.id}
                  onPress={() => handlePress(item.id)}
                />
              )}
              contentContainerStyle={themed($bottomSheetContainer)}
            />
          </View>
          <View style={themed($divider)}></View>

          <View style={themed($bottomSheetButton)}>
            <Button
              text="Next"
              style={themed($tapButtonYes)}
              preset="reversed"
              onPress={buttonNextClick}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet
        enablePanDownToClose
        ref={detailsSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={-1}
      >
        <BottomSheetView>
          <View style={themed($bottomSheetDetail)}>
            <Text preset="subheading" style={themed($headerBottomSheet)}>
              Enter Details
            </Text>
            <TextField
              value={price}
              onChangeText={setPrice}
              containerStyle={themed($textField)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              labelTx="Hourly Price"
              placeholderTx="loginScreen:emailFieldPlaceholder"
              helper={error}
              status={error ? "error" : undefined}
              onSubmitEditing={() => authPasswordInput.current?.focus()}
            />
            <TextField
              value={description}
              onChangeText={setDescription}
              containerStyle={themed($textField)}
              autoCapitalize="none"
              autoComplete="article"
              autoCorrect={false}
              keyboardType="email-address"
              labelTx="Description"
              placeholderTx="Some description"
              helper={error}
              status={error ? "error" : undefined}
              onSubmitEditing={() => authPasswordInput.current?.focus()}
            />
          </View>
          <View style={themed($divider)}></View>

          <View style={themed($bottomSheetButton)}>
            <Button
              text="Next"
              style={themed($tapButtonYes)}
              preset="reversed"
              onPress={buttonNextClick}
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

const $headerRightContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
})

const $buttonBackContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
})
const $buttonPlusContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "black",
  padding: spacing.sm,
  borderRadius: spacing.lg,
})

const $walletContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.palette.wallet,
  marginRight: spacing.sm,
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
const $dividerVertical: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral400,
  height: 80,
  width: 1,
})
const $tabViewContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flex: 1,
  backgroundColor: colors.palette.neutral100,
})

const $emptyContent: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginTop: spacing.md,
})
const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
})
const $bottomSheetContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  // paddingLeft: spacing.lg,
})
const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
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
  paddingLeft: spacing.sm,
})
const $selectItemContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.neutral100,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: 60,
  overflow: "hidden",
  paddingHorizontal: spacing.lg,
})
const $selectedItemContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.blurRipper,
})
const $overlay: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: spacing.sm,
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
const $editIcon: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  height: "100%",
  width: 40,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.palette.neutral200,
})
const $headerBottomSheet: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
})
const $bottomSheetContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  // padding: spacing.md,
  // marginHorizontal: spacing.md,
  // alignItems: "center",
})

const $bottomSheetDetail: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  marginHorizontal: spacing.md,
})

const $bottomSheetButton: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
  marginHorizontal: spacing.md,
})

const $tapButtonYes: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})
