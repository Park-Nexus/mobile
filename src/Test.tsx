import React, {useState} from 'react';

import {Button, Text, TextInput, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {trpc} from './trpc';
import {AuthTypes} from './types';

export const Test = () => {
  return (
    <>
      <PrivateCall />
      <Register />
      <Login />
      <Logout />
    </>
  );
};

function PrivateCall() {
  const {data} = trpc.home.private.useQuery();

  const trpcUtils = trpc.useUtils();

  return (
    <View>
      <Text>{data ? data : 'Not logged in'}</Text>
      <Button
        title="Refetch"
        onPress={() => trpcUtils.home.private.invalidate()}
      />
    </View>
  );
}

function Register() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const regMutation = trpc.auth.register.useMutation({
    onSuccess(data) {
      console.log(`User id ${data.id} registered!`);
    },
    onError(err) {
      console.error(err.message);
    },
  });

  return (
    <View>
      <Text>Register</Text>
      <TextInput value={phone} onChangeText={setPhone} />
      <TextInput value={password} onChangeText={setPassword} />
      <Button
        title="Reg"
        onPress={() => regMutation.mutate({phone, password})}
      />
    </View>
  );
}

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const trpcUtils = trpc.useUtils();

  const loginMutation = trpc.auth.login.useMutation({
    async onSuccess(data) {
      await AsyncStorage.setItem(
        AuthTypes.ACCESS_TOKEN_STORAGE_KEY,
        data.accessToken,
      );
      await AsyncStorage.setItem(
        AuthTypes.REFRESH_TOKEN_STORAGE_KEY,
        data.refreshToken,
      );
      trpcUtils.home.private.invalidate();
    },
    onError(err) {
      console.error(err.message);
    },
  });

  return (
    <View>
      <Text>Login</Text>
      <TextInput value={phone} onChangeText={setPhone} />
      <TextInput value={password} onChangeText={setPassword} />
      <Button
        title="Login"
        onPress={() => loginMutation.mutate({phone, password})}
      />
    </View>
  );
}

export function Logout() {
  const trpcUtils = trpc.useUtils();
  const logout = async () => {
    await AsyncStorage.clear();
    trpcUtils.home.private.reset();
  };

  return (
    <View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
