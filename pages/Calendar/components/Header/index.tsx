import { View, Text } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import styles from './Header.styles';

type Props = {
  onPressLeft: () => void;
  onPressRight: () => void;
  title: string;
  headerColor?: string;
  textColor?: string;
};

export const Header = ({
  onPressLeft,
  onPressRight,
  title,
  headerColor = '#121b22',
}: Props) => {
  return (
    <View style={[styles.container, { backgroundColor: headerColor }]}>
      <View style={styles.headerContainer}>
        {/* Left button */}
        <Icon.Button
          name='trash'
          size={26}
          color="#dbe3e5"
          style={{ backgroundColor: headerColor }}
          onPress={onPressLeft}
        />

        {/* Header Title */}
        <Text style={styles.text}>{title}</Text>

        {/* Right button */}
        <Icon.Button
          name='plus-circle'
          size={26}
          color="#0BC85B"
          style={{ backgroundColor: headerColor }}
          onPress={onPressRight}
        />
      </View>
    </View>
  );
};
