// services/loanService.ts
import { firebaseAuth, firebaseFirestore } from '../firebaseConfig';
import firestore from '@react-native-firebase/firestore';

export const submitLoanRequest = async (amount: number, reason: string, duration: string) => {
  const user = firebaseAuth.currentUser;

  if (!user) throw new Error('User not authenticated');

  const loanData = {
    userId: user.uid,
    amount,
    reason,
    duration,
    status: 'pending',
    createdAt: firestore.FieldValue.serverTimestamp(), // ✅ RN Firebase
  };

  const docRef = await firebaseFirestore()
    .collection('loanRequests')
    .add(loanData);

  return docRef.id;
};
