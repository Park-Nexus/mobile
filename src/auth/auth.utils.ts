import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export namespace PhoneAuth {
  export async function signIn(
    phone: string,
  ): Promise<FirebaseAuthTypes.ConfirmationResult> {
    return auth().signInWithPhoneNumber(phone);
  }

  export async function confirm(
    confirmation: FirebaseAuthTypes.ConfirmationResult,
    code: string,
  ): Promise<FirebaseAuthTypes.UserCredential | null> {
    return confirmation.confirm(code);
  }
}
