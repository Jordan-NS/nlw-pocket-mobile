import { useEffect, useState } from "react"
import { View, Text, Alert, Modal } from "react-native"
import { router, useLocalSearchParams, Redirect } from "expo-router"
import { api } from "@/services/api"
import { Loading } from "@/components/loading"
import { Cover } from "@/components/market/cover"
import { Details, PropsDetails } from "@/components/market/details"
import { Coupon } from "@/components/market/coupon"
import { Button } from "@/components/button"
import { useCameraPermissions, CameraView } from "expo-camera"

type DataProps = PropsDetails & {
  cover: string,
}

export default function Market() {
  const [data, setData] = useState<DataProps>()

  const [coupon, setCoupon] = useState<string | null>(null)
  
  const [isLoading, setIsLoading] = useState(true)

  const params = useLocalSearchParams<{ id: string }>()

  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)

  const [permission, requestPermission] = useCameraPermissions()

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setData(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert("Loja não encontrada", "Tente novamente mais tarde.", [
        { text: "OK", onPress: () => router.back()  },
      ])
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()

      if (!granted) {
        return Alert.alert("Permissão de câmera negada", "Por favor, habilite a permissão para usar a câmera.")
      }

      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro ao abrir a câmera", "Tente novamente mais tarde.")
    }
  }

  useEffect(() => {
    fetchMarket();
  },[params.id]);

  if (isLoading) return <Loading />

  if (!data) return <Redirect href="/" />

  return (
    <View style={{ flex: 1 }}>
      <Cover uri={data.cover} />
      <Details data={data} />
      {coupon && <Coupon code={coupon}/>}

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>
            Ler QR Code
          </Button.Title>
        </Button>
      </View>
      <Modal style={{ flex: 1}} visible={isVisibleCameraModal}>
        <Button onPress={() => setIsVisibleCameraModal(false)}>
          <Button.Title>
            Voltar
          </Button.Title>
        </Button>
      </Modal> 
    </View>
  )
}