import {Text, View} from 'react-native';

interface IGuardTemplateProps {
  isLoading: boolean;
  message: string;
  children: React.ReactNode;
}

export function GuardTemplate({
  isLoading,
  message,
  children,
}: IGuardTemplateProps) {
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
        <Text>{message}</Text>
      </View>
    );
  }

  return children;
}
