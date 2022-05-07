import BottomSheet from "@gorhom/bottom-sheet";
import { ChatTeardropDots } from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";

import { Options } from "../Options";
import { Form } from "../Form";
import { Success } from "../Success";

import { styles } from "./styles";

export type feedbackType = keyof typeof feedbackTypes;
function Widget() {
  const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpenBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpenBottomSheet}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success />
        ) : (
          <>
            {feedbackType ? (
              <Form feedbackType={feedbackType} />
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
