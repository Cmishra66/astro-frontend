import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Fade-In Animation for the entire container
const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;  // Initial opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,  // Final opacity: 1 (fully visible)
      duration: 3000,  // 5 seconds for fade-in
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,  // Bind animated opacity to the container
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// Slide-In Animation for List Items
const SlideInItem = ({ item, index }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      delay: index * 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, index]);

  return (
    <Animated.View style={{ ...styles.itemContainer, transform: [{ translateX: slideAnim }] }}>
      <Text style={styles.itemText}>{item}</Text>
    </Animated.View>
  );
};

const SlideInList = () => {
  const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => <SlideInItem item={item} index={index} />}
      keyExtractor={(item) => item}
    />
  );
};

// Rotation and Shrink Button Animation
const RotateButton = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const rotate = () => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      rotateAnim.setValue(0); // Reset after rotation
    });
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity onPress={rotate}>
      <Animated.View
        style={{
          transform: [{ rotate: rotateInterpolate }, { scale: scaleAnim }],
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Rotate</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Main App
const App = () => {
  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      {/* Fade-In for the entire container */}
      <FadeInView style={styles.container}>
        {/* Slide-In List */}
        <SlideInList />

        {/* Rotation & Shrink Button */}
        <RotateButton />
      </FadeInView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,  // Reduced padding
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    width: '80%',  // Set specific width
    height: 'auto',  // Let height adjust automatically
  },
  itemContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
  button: {
    padding: 15,
    backgroundColor: '#ff6b6b',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default App;
