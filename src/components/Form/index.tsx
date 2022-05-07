import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Button } from "../Button";
import { ScreenshotButton } from "../ScreenshotButton";
import { feedbackType } from "../Widget";

import { styles } from "./styles";

interface Props {
  feedbackType: feedbackType;
  onFeedbackCancelled: () => void;
  onFeedbackSent: () => void;
}
export function Form({ feedbackType, onFeedbackCancelled }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>();

  const feedback = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.log(error));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onFeedbackCancelled()}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedback.image} style={styles.image} />
          <Text style={styles.title}>{feedback.title}</Text>
        </View>
      </View>
      <TextInput
        autoCorrect={false}
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={() => setScreenshot(null)}
          screenshot={screenshot}
        />
        <Button isLoading={false} />
      </View>
    </View>
  );
}
