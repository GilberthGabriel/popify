import { usePlayer } from "@/contexts/player-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BorderRadiuses,
  Colors,
  Spacings,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native-ui-lib";

const Container: React.FC<ViewProps> = ({ children, style, ...rest }) => {
  const { top } = useSafeAreaInsets();
  const {
    currentTrack,
    paused,
    playerMinimized,
    pauseTrack,
    resumeTrack,
    showPlayer,
  } = usePlayer();

  return (
    <LinearGradient
      style={{
        flex: 1,
        paddingTop: top + Spacings.s2,
        ...(style as any),
      }}
      colors={[Colors.background, Colors.backgroundLight]}
      start={{ x: 0.2, y: 0.25 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View flex paddingB-s10 {...rest}>
          <StatusBar translucent />
          {children}
        </View>
      </ScrollView>
      {playerMinimized && currentTrack && (
        <TouchableOpacity absB paddingH-s5 paddingB-s2 onPress={showPlayer}>
          <View
            br40
            padding-s3
            style={{
              backgroundColor: Colors.black,
            }}
            row
            centerV
            spread
          >
            <Image
              source={{
                uri: currentTrack.album.cover_medium,
              }}
              style={{
                width: 50,
                aspectRatio: 1,
                borderRadius: BorderRadiuses.br40,
              }}
            />
            <View
              style={{
                maxWidth: "60%",
              }}
            >
              <Text white center numberOfLines={1}>
                {currentTrack?.title}
              </Text>
              <Text grey30 center numberOfLines={1}>
                {currentTrack?.artist.name}
              </Text>
            </View>

            <TouchableOpacity onPress={paused ? resumeTrack : pauseTrack}>
              <Ionicons
                name={paused ? "play" : "pause"}
                size={42}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default Container;
