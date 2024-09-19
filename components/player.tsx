import Container from "@/components/container";
import { usePlayer } from "@/contexts/player-context";
import { getChart, getSearch } from "@/services/api";
import { Artist, Track } from "@/types/dto";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import {
  BorderRadiuses,
  Colors,
  ProgressBar,
  Spacings,
  Text,
  TextField,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";

export default function Player() {
  const {
    currentTrack,
    paused,
    progressPercentage,
    pauseTrack,
    resumeTrack,
    hidePlayer,
    resetPlayer,
  } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  return (
    <Container style={{ paddingTop: Spacings.s3 }} spread>
      <View paddingH-s5 row centerV spread>
        <TouchableOpacity onPress={hidePlayer}>
          <Ionicons name="chevron-down" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={resetPlayer}>
          <Ionicons name="close" size={27} color="white" />
        </TouchableOpacity>
      </View>

      <View center paddingH-s6>
        <Image
          source={{
            uri: currentTrack.album.cover_medium,
          }}
          style={{
            width: 250,
            aspectRatio: 1,
            borderRadius: BorderRadiuses.br40,
            marginBottom: Spacings.s6,
          }}
        />

        <Text text60BL white center marginB-s2>
          {currentTrack.title}
        </Text>
        <Text text80 grey40 center>
          {currentTrack.artist.name}
        </Text>

        <View width="100%" paddingH-s6 centerH marginV-s10>
          <View width="100%" marginB-s10>
            <ProgressBar
              progress={progressPercentage || 0}
              progressColor={Colors.red30}
            />
          </View>

          <TouchableOpacity onPress={paused ? resumeTrack : pauseTrack}>
            <Ionicons
              name={paused ? "play" : "pause"}
              size={42}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View paddingH-s6 centerH></View>
    </Container>
  );
}
