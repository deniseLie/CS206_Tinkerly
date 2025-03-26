import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ServiceProviderCard({ service, serviceOnPress }) {
  return (
    <View style={styles.cardContainer}>
      <Image source={require('frontend/assets/images/ahbeng.png')} style={styles.profileImage} />
        {/* Info */}
        <View style={styles.infoContainer}>
            <Text style={styles.nameText}>{service.name}</Text>
            <Text style={styles.servicesText}>{service.category}</Text>
            <View style={styles.locationContainer}>
            <FontAwesome name="map-marker" size={14} color="gray" />
            <Text style={styles.distanceText}>{service.distance} km</Text>
            </View>
        </View>

        {/* Ratings */}
        <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{service.rating.toFixed(2)}</Text>
            <FontAwesome name="star" size={14} color="#F4A100" />
            <Text style={styles.reviewsText}>({service.reviews})</Text>
        </View>

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text>Starting From</Text>
          <Pressable style={styles.priceButton} onPress={serviceOnPress}>
              <Text style={styles.priceText}>{service.price || 40} SGD</Text>
          </Pressable>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  servicesText: {
    fontSize: 12,
    color: "gray",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  distanceText: {
    fontSize: 12,
    color: "gray",
    marginLeft: 4,
  },
  ratingContainer: {
    position: 'absolute',
    right: 1,
    backgroundColor: '#EEEEEE',
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 7
  },
  ratingText: {
    fontSize: 12,
    color: "#F4A100",
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: "gray",
  },
  priceContainer:{ 
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  priceButton: {
    flexShrink: 0,
    backgroundColor: "#41A48F",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  priceText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
