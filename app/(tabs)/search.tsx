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

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Track[]>([]);

  async function handleSearch() {
    const response = await getSearch(query);

    setResult(response.data.data);
  }

  useEffect(() => {
    if (query?.length >= 5) handleSearch();
  }, [query]);

  return (
    <Container>
      <View paddingH-s5>
        <TextField
          placeholder="Busca (Insira 5 ou mais caracteres)"
          style={{
            backgroundColor: "white",
            padding: Spacings.s4,
            borderRadius: Spacings.s3,
            height: 50,
          }}
          onChangeText={setQuery}
          trailingAccessory={
            <TouchableOpacity onPress={handleSearch} marginL-s2>
              <Ionicons name="search" color="white" size={28} />
            </TouchableOpacity>
          }
        />
      </View>

      <View marginT-s8>
        <View marginH-s5>
          <Text white text50BL marginB-s4>
            Resultados
          </Text>
        </View>

        <FlatList
          data={result}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: "center",
            paddingHorizontal: Spacings.s7,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              br20
              marginB-s4
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
