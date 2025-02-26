import { FC } from "react"
import { Screen } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { $styles } from "../theme"

export const HomeScreen: FC<DemoTabScreenProps<"Home">> = function DemoCommunityScreen(_props) {
  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$styles.container}
      safeAreaEdges={["top"]}
    ></Screen>
  )
}
