import React, {useState, useEffect} from 'react';
import { Modal, StyleSheet, Text, View, Pressable } from 'react-native';

interface Props {
  isVisible: boolean,
  title: string,
  message: string,
  acceptText: string,
  cancelText: string,
  acceptFn: CallableFunction,
  cancelFn: CallableFunction
}

export default function CustomModal(props: Props) {
  const [modalVisible, setModalVisible] = useState(props.isVisible);

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
            <Text style={styles.modalText}>{props.message}</Text>
            <Pressable
              style={styles.acceptBtn}
              onPress={() => props.acceptFn()}
            >
              <Text style={styles.btnText}>{props.acceptText}</Text>
            </Pressable>
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
