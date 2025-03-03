import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ServiceProviderCard({
  name = "Service Name",
  services = "AC Services",
  distance = "1 km",
  rating = 4.85,
  reviews = "11.9k",
  price = "55 SGD",
  imageUri = "frontend\assets\images\ahbeng.png"
}) {
  return (
    <View style={styles.cardContainer}>
        <Image source={{ src: imageUri }} style={styles.profileImage} />

        {/* I */}
        <View style={styles.infoContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.servicesText}>{services}</Text>
            <View style={styles.locationContainer}>
            <FontAwesome name="map-marker" size={14} color="gray" />
            <Text style={styles.distanceText}>{distance}</Text>
            </View>
        </View>

        {/* Ratings */}
        <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{rating.toFixed(2)}</Text>
            <FontAwesome name="star" size={14} color="#F4A100" />
            <Text style={styles.reviewsText}>({reviews})</Text>
        </View>

        <Pressable style={styles.priceButton}>
            <Text style={styles.priceText}>{price}</Text>
        </Pressable>
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
    borderRadius: 25,
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
  priceButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
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
