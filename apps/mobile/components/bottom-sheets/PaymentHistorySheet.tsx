import React from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { Payment } from '../app/(tabs)/index';

interface PaymentHistorySheetProps {
  payments: Payment[];
  reconfirmationDate: string;
  onRemovePayment: (paymentId: string) => void;
}

export const PaymentHistorySheet: React.FC<PaymentHistorySheetProps> = ({
  payments,
  reconfirmationDate,
  onRemovePayment,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRemovePayment = (payment: Payment) => {
    Alert.alert(
      'Remove Payment',
      'Are you sure you want to remove this payment from your history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => onRemovePayment(payment.id),
        },
      ]
    );
  };

  const getCurrentQuarterPayments = () => {
    const today = new Date();
    const reconfirmDate = new Date(reconfirmationDate);

    // Calculate current quarter boundaries
    let currentQuarterStart = new Date(reconfirmDate);
    let currentQuarterEnd = new Date(reconfirmDate);
    currentQuarterEnd.setMonth(currentQuarterEnd.getMonth() + 3);

    // If we're past the first quarter, find the current quarter
    while (today > currentQuarterEnd) {
      currentQuarterStart = new Date(currentQuarterEnd);
      currentQuarterEnd.setMonth(currentQuarterEnd.getMonth() + 3);
    }

    return payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate >= currentQuarterStart && paymentDate <= currentQuarterEnd;
    });
  };

  const currentQuarterPayments = getCurrentQuarterPayments();
  const totalCurrentQuarterTopUp = currentQuarterPayments.reduce((sum, payment) => sum + payment.governmentTopUp, 0);
  const totalCurrentQuarterAmount = currentQuarterPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="items-center mb-6 px-4">
        <Text className="text-xl font-bold" style={{ fontFamily: 'PublicSans_700Bold' }}>
          Payment History
        </Text>
        <Text className="text-sm text-gray-600 text-center mt-1" style={{ fontFamily: 'PublicSans_400Regular' }}>
          Track your childcare payments and government contributions
        </Text>
      </View>

      {/* Current Quarter Summary */}
      <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 px-4 mx-4">
        <Text className="text-base font-semibold mb-3 text-blue-900" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
          Current Quarter Summary
        </Text>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm text-blue-800" style={{ fontFamily: 'PublicSans_400Regular' }}>
            Total Payments
          </Text>
          <Text className="text-sm font-semibold text-blue-900" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
            {currentQuarterPayments.length}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mb-2 px-4">
          <Text className="text-sm text-blue-800" style={{ fontFamily: 'PublicSans_400Regular' }}>
            Total Amount
          </Text>
          <Text className="text-sm font-semibold text-blue-900" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
            £{totalCurrentQuarterAmount.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between items-center px-4">
          <Text className="text-sm text-blue-800" style={{ fontFamily: 'PublicSans_400Regular' }}>
            Government Top-up Used
          </Text>
          <Text className="text-sm font-semibold text-blue-900" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
            £{totalCurrentQuarterTopUp.toFixed(2)} / £500
          </Text>
        </View>
      </View>

      {/* Payment List */}
      {payments.length === 0 ? (
        <View className="items-center py-8 px-4">
          <FontAwesomeIcon icon={faFileAlt} size={48} color="#d1d5db" />
          <Text className="text-lg font-semibold text-gray-600 mt-4" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
            No payments yet
          </Text>
          <Text className="text-sm text-gray-500 text-center mt-2" style={{ fontFamily: 'PublicSans_400Regular' }}>
            Your payment history will appear here once you start confirming payments.
          </Text>
        </View>
      ) : (
        <View className="mb-8 px-4">
          <Text className="text-base font-semibold mb-4" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
            All Payments ({payments.length})
          </Text>

          {payments
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((payment, index) => (
              <View
                key={payment.id}
                className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-1">
                    <Text className="text-base font-semibold" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                      £{payment.amount.toFixed(2)}
                    </Text>
                    <Text className="text-sm text-gray-600" style={{ fontFamily: 'PublicSans_400Regular' }}>
                      {formatDate(payment.date)} at {formatTime(payment.date)}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => handleRemovePayment(payment)}
                    className="bg-red-100 p-2 rounded-lg"
                  >
                    <FontAwesomeIcon icon={faTrash} size={14} color="#dc2626" />
                  </Pressable>
                </View>

                {payment.description && (
                  <Text className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'PublicSans_400Regular' }}>
                    {payment.description}
                  </Text>
                )}

                <View className="border-t border-gray-100 pt-3">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-xs text-gray-500" style={{ fontFamily: 'PublicSans_400Regular' }}>
                      You paid
                    </Text>
                    <Text className="text-xs font-medium" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                      £{payment.parentPaid.toFixed(2)}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs text-gray-500" style={{ fontFamily: 'PublicSans_400Regular' }}>
                      Government added
                    </Text>
                    <Text className="text-xs font-medium text-green-600" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                      £{payment.governmentTopUp.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </View>
      )}
    </ScrollView>
  );
};