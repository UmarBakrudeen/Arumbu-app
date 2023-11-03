import { StyleSheet, Text, View, useWindowDimensions, FlatList, Image, TouchableOpacity, Button, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { PRODUCTS } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQty, incrementQty } from '../ProductReducer'
import { decrementQuantity, incrementQuantity } from '../CartReducer'

const CartScreen = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const total = cart.map((item) => item.quantity * item.pricePerKg).reduce((curr, prev) => curr + prev, 0)
  const navigation = useNavigation()
  const window = useWindowDimensions()

  return (
    <>
      <ScrollView>
        {total === 0 ? (
          <View style={{
            alignItems:'center'
          }}>
            <Text style={{
              fontFamily:'Lato-Bold',
              fontSize:20,
            }}> Your Cart is empty</Text>
          </View>
        ): (
          <>
          <View style = {styles.container}>
        {cart.map((item, index) => (
          <View style={{
            flexDirection: 'row',
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
            key={index}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <View style={{ borderRadius: 12, borderColor: '#e0e0e0', width: 60, height: 60, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={item.Img} style={{
                  height: 50,
                  width: 50,
                  borderRadius: 10
                }} />
              </View>
              <View style={{
                paddingLeft: 10
              }}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.Qty}>{item.Qty}</Text>
                <Text style={styles.price}>Rs. {item.pricePerKg}</Text>
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 6,
              backgroundColor: '#005600',
              borderRadius: 10
            }}>
              <TouchableOpacity onPress={() => {
                dispatch(decrementQuantity(item))
                dispatch(decrementQty(item))
              }}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.buttonText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => {
                dispatch(incrementQuantity(item))
                dispatch(incrementQty(item))}}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>))}
      </View>
      <View style={[styles.container, {
        padding: 10
      }]}>
        <Text style={styles.header}>Bill Details</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>item total (incl.taxes)</Text>
          <Text style={styles.detailText}>₹ {total}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>Delivery Charges</Text>
          <Text style={styles.detailText}>₹ 30</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.total}>Grand Total</Text>
          <Text style={styles.total}>₹ {total + 30}</Text>
        </View>
      </View>
      <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('Payment')}>
        <Text style={styles.button}>PROCEED</Text>
      </Pressable>
    </>
  )
}
        
      </ScrollView >
    </>
  )
}
export default CartScreen

const styles = StyleSheet.create({
  productName: {
    fontFamily: 'Lato-Bold',
    fontSize: 13.5,
    color: '#005600'
  },
  price: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    color: '#005600',
    paddingVertical: 4
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    paddingHorizontal: 6
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10
  },
  header: {
    fontFamily: 'Lato-Bold',
    color: '#005600',
    fontSize: 15,
    marginBottom: 10
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  detailText: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    marginBottom: 5
  },
  total: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    marginBottom: 5
  },
  buttonContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#005600',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 40
  },
  button: {
    color: 'white',
    fontFamily: 'Lato-Bold',
  }
})