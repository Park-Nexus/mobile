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
  const {data} = trpc.user.profile.get.single.useQuery();

  const trpcUtils = trpc.useUtils();

  return (
    <View>
      <Text>{data ? data.accountId : 'Not logged in'}</Text>
      <Button
        title="Refetch"
        onPress={() => trpcUtils.user.profile.invalidate()}
      />
    </View>
  );
}

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const regMutation = trpc.auth.register.useMutation({
    onSuccess() {
      console.log(`User registered!`);
    },
    onError(err) {
      console.error(err.message);
    },
  });

  return (
    <View>
      <Text>Register</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <TextInput value={password} onChangeText={setPassword} />
      <Button
        title="Reg"
        onPress={() => regMutation.mutate({email, password, role: 'USER'})}
      />
    </View>
  );
}

function Login() {
  const [email, setEmail] = useState('');
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
      trpcUtils.user.profile.invalidate();
    },
    onError(err) {
      console.error(err.message);
    },
  });

  return (
    <View>
      <Text>Login</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <TextInput value={password} onChangeText={setPassword} />
      <Button
        title="Login"
        onPress={() => loginMutation.mutate({email, password})}
      />
    </View>
  );
}

export function Logout() {
  const trpcUtils = trpc.useUtils();
  const logout = async () => {
    await AsyncStorage.clear();
    trpcUtils.user.profile.get.single.reset();
  };

  return (
    <View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
