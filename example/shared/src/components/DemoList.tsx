import { useRef, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Pressable,
  View,
  Text,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import {
  BORDER_RADIUS,
  DARK,
  DARK_GRAY,
  FOOTER_HEIGHT,
  GAP,
  HEADER_HEIGHT,
  LIGHT_GRAY,
  SPACING,
  times,
} from '../utils';

const HeavyItem = ({ index }: { index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Pressable
      onPress={() => {
        console.log(index, 'on HeavyItem Press');
      }}
      style={styles.item}
    >
      <View style={styles.imageContainer}>
        {!imageLoaded && <ActivityIndicator style={styles.loader} size="small" />}
        <Image
          source={{ uri: `https://picsum.photos/seed/${index}/400/300` }}
          style={styles.image}
          onLoad={() => setImageLoaded(true)}
        />
      </View>
      <ItemFooter index={index} />
    </Pressable>
  );
};

export const ItemFooter = ({ index }: { index: number }) => {
  const ref = useRef<TrueSheet>(null);
  const open = () => {
    ref.current?.present();
  };

  return (
    <>
      <Pressable onPress={open} style={styles.itemContent}>
        <Text style={styles.itemTitle}>Item #{index + 1}</Text>
        <Text style={styles.itemDescription}>
          Complex component with images and text to test heavy rendering and lazy loading.
        </Text>
      </Pressable>
      <TrueSheet ref={ref} detents={[0.5]} backgroundColor={Platform.select({ android: DARK })}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Sheet content</Text>
        </View>
      </TrueSheet>
    </>
  );
};

export const DemoList = () => {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {times(20, (i) => (
        <HeavyItem key={i} index={i} />
      ))}
    </ScrollView>
  );
};

DemoList.displayName = 'DemoList';

const styles = StyleSheet.create({
  content: {
    padding: SPACING,
    paddingTop: HEADER_HEIGHT + SPACING,
    paddingBottom: FOOTER_HEIGHT + SPACING,
    gap: GAP,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  footer: {
    backgroundColor: Platform.select({
      default: DARK_GRAY,
      ios: undefined,
    }),
  },
  item: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: SPACING * 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -10,
    marginTop: -10,
  },
  itemContent: {
    padding: SPACING,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: SPACING / 2,
  },
  itemDescription: {
    fontSize: 14,
    color: LIGHT_GRAY,
    lineHeight: 20,
  },
  placeholder: {
    height: 400,
    padding: SPACING,
    alignItems: 'center',
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 14,
  },
});
