import React, {useState, useEffect} from 'react';
import { Modal, StyleSheet, Text, View, Pressable, Image } from 'react-native';

interface Props {
  isVisible: boolean,
  title: string,
  message: any,
  acceptText: string,
  cancelText: string,
  cancelFn: CallableFunction
}

export default function infoModal(props: Props) {
  const [modalVisible, setModalVisible] = useState(props.isVisible);
  const {icono, sensacion, humedad, temperatura, viento } = props.message;
  console.log("icono", icono)
  const handleClose = () => {
    setModalVisible(!modalVisible); 
    if(props.cancelFn) props.cancelFn();
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => handleClose()}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.title}</Text>
            <Text style={styles.modalText}>{}</Text>
            <Text style={styles.modalText}>{temperatura}</Text>
            <Text style={styles.modalText}>{sensacion}</Text>
            <Text style={styles.modalText}>{humedad}</Text>
            <Text style={styles.modalText}>{viento}</Text>
            <Image source={{uri:icono}} style={styles.tinyLogo} />
            <Pressable
              style={[styles.cancelBtn, styles.buttonClose]}
              onPress={() => handleClose()}
            >
              <Text style={styles.btnText}>{props.cancelText}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  acceptBtn: {
    backgroundColor: 'orange',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  cancelBtn: {
    backgroundColor: 'darkgrey',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
