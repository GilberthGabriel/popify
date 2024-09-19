import Container from "@/components/container";
import { usePlayer } from "@/contexts/player-context";
import { getChart, getSearch } from "@/services/api";
import { Artist, Track } from "@/types/dto";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import {
  BorderRadiuses,
  Spacings,
  Text,
  TextField,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";

export default function Home() {
  const { playTrack } = usePlayer();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [forYou, setForYou] = useState<Track[]>([]);

  useEffect(() => {
    const searchTerms = [
      "rock",
      "pop",
      "jazz",
      "hip hop",
      "classical",
      "reggae",
      "metal",
      "blues",
      "country",
      "electronic",
      "indie",
      "punk",
      "soul",
      "alternative",
      "disco",
      "gospel",
      "grunge",
      "house",
      "latin",
      "funk",
    ];

    const randomTerm =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];

    getChart().then((res) => {
      setTracks(res.data.tracks.data);
      setArtists(res.data.artists.data);
    });

    getSearch(randomTerm).then((res) => {
      setForYou(res.data.data);
    });
  }, []);

  return (
    <Container>
      <View paddingH-s5>
        <TextField
          placeholder="Busca"
          style={{
            backgroundColor: "white",
            padding: Spacings.s4,
            borderRadius: Spacings.s3,
            height: 50,
          }}
          trailingAccessory={
            <View marginL-s2>
              <Ionicons name="search" color="white" size={28} />
            </View>
          }
        />
      </View>

      <View marginT-s8>
        <View marginH-s5>
          <Text white text50BL marginB-s4>
            Para você
          </Text>
        </View>

        <FlatList
          data={forYou}
          horizontal
          contentContainerStyle={{
            paddingLeft: Spacings.s5,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              br20
              marginR-s4
              style={{ overflow: "hidden", width: 150, height: 150 }}
              onPress={() => {
                playTrack(item);
              }}
            >
              <Image
                source={{
                  uri: item.album.cover_big,
                }}
                style={{
                  width: 150,
                  aspectRatio: 1,
                  borderRadius: BorderRadiuses.br40,
                }}
              />
              <LinearGradient
                style={{
                  height: 120,
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  justifyContent: "flex-end",
                  padding: Spacings.s2,
                }}
                colors={["transparent", "black"]}
              >
                <Text white>{item.title_short}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </View>

      <View marginT-s8>
        <View marginH-s5>
          <Text white text50BL marginB-s4>
            Artistas
          </Text>
        </View>

        <FlatList
          data={artists}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Spacings.s5,
          }}
          renderItem={({ item }) => (
            <View
              br20
              marginR-s4
              style={{ overflow: "hidden", width: 150, height: 150 }}
            >
              <Image
                source={{
                  uri: item.picture_big,
                }}
                style={{
                  width: 150,
                  aspectRatio: 1,
                  borderRadius: BorderRadiuses.br40,
                }}
              />
              <LinearGradient
                style={{
                  height: 120,
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  justifyContent: "flex-end",
                  padding: Spacings.s2,
                }}
                colors={["transparent", "black"]}
              >
                <Text white>{item.name}</Text>
              </LinearGradient>
            </View>
          )}
        />
      </View>

      <View marginT-s8>
        <View marginH-s5>
          <Text white text50BL marginB-s4>
            Músicas
          </Text>
        </View>

        <FlatList
          data={tracks}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Spacings.s5,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              br20
              marginR-s4
              style={{ overflow: "hidden", width: 150, height: 150 }}
              onPress={() => {
                playTrack(item);
              }}
            >
              <Image
                source={{
                  uri: item.album.cover_big,
                }}
                style={{
                  width: 150,
                  aspectRatio: 1,
                  borderRadius: BorderRadiuses.br40,
                }}
              />
              <LinearGradient
                style={{
                  height: 120,
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  justifyContent: "flex-end",
                  padding: Spacings.s2,
                }}
                colors={["transparent", "black"]}
              >
                <Text white>{item.title_short}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      </View>
    </Container>
  );
}
