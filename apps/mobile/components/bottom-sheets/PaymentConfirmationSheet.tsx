import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import type { Child, Payment } from '@/types';
import { useAnalytics, getChildAnalyticsProperties } from '@/lib/analytics';

interface PaymentConfirmationSheetProps {
  child: Child;
  suggestedAmount: number;
  suggestedTopUp: number;
  onConfirm: (payment: Omit<Payment, 'id'>) => void;
  onCancel: () => void;
}

export const PaymentConfirmationSheet: React.FC<PaymentConfirmationSheetProps> = ({
  child,
  suggestedAmount,
  suggestedTopUp,
  onConfirm,
  onCancel,
}) => {
  const [amount, setAmount] = useState(suggestedAmount.toFixed(2));
  const [topUp, setTopUp] = useState(suggestedTopUp.toFixed(2));
  const [description, setDescription] = useState('');
  const { trackEvent } = useAnalytics();

  const handleConfirm = () => {
    const paymentAmount = parseFloat(amount) || 0;
    const topUpAmount = parseFloat(topUp) || 0;
    const totalAmount = paymentAmount + topUpAmount;

    const payment: Omit<Payment, 'id'> = {
      childId: child.id,
      amount: totalAmount,
      parentPaid: paymentAmount,
      governmentTopUp: topUpAmount,
      date: new Date().toISOString(),
      description: description.trim() || undefined,
    };

    trackEvent('payment_added', {
      payment_amount: paymentAmount,
      government_topup: topUpAmount,
      payment_description_provided: !!description.trim(),
      ...getChildAnalyticsProperties([child])
    });

    onConfirm(payment);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mb-6 px-4">
          <Text className="text-xl font-bold" style={{ fontFamily: 'PublicSans_700Bold' }}>
            Confirm Payment
          </Text>
          <Text className="text-sm text-gray-600 text-center mt-1" style={{ fontFamily: 'PublicSans_400Regular' }}>
            Review and confirm your payment details for {child.name || 'your child'}
          </Text>
        </View>

        {/* Payment Details */}
        <View className="bg-gray-50 rounded-xl p-4 mb-6">
          <Text className="text-base font-semibold mb-3" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
            Payment Breakdown
          </Text>

          {/* You Pay */}
          <View className="mb-4">
            <Text className="text-sm font-medium mb-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
              Amount You Pay
            </Text>
            <View className="flex-row items-center bg-white rounded-lg px-4 py-3 border border-gray-200">
              <Text className="text-gray-600 mr-2" style={{ fontFamily: 'PublicSans_400Regular' }}>£</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="numeric"
                className="flex-1 text-base"
                style={{ fontFamily: 'PublicSans_400Regular' }}
              />
            </View>
          </View>

          {/* Government Top-up */}
          <View className="mb-4">
            <Text className="text-sm font-medium mb-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
              Government Top-up
            </Text>
            <View className="flex-row items-center bg-green-50 rounded-lg px-3 py-3 border border-green-200">
              <Text className="text-gray-600 mr-2" style={{ fontFamily: 'PublicSans_400Regular' }}>£</Text>
              <TextInput
                value={topUp}
                onChangeText={setTopUp}
                placeholder="0.00"
                keyboardType="numeric"
                className="flex-1 text-base"
                style={{ fontFamily: 'PublicSans_400Regular' }}
                editable={false}
              />
            </View>
            <Text className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'PublicSans_400Regular' }}>
              Government contribution (20% of your payment)
            </Text>
          </View>

          {/* Total */}
          <View className="border-t border-gray-200 pt-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-base font-semibold" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                Total Deposit
              </Text>
              <Text className="text-xl font-bold text-blue-600" style={{ fontFamily: 'PublicSans_700Bold' }}>
                £{((parseFloat(amount) || 0) + (parseFloat(topUp) || 0)).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View className="mb-6 px-4">
          <Text className="text-sm font-medium mb-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
            Description (Optional)
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="e.g., Weekly nursery fees, Holiday club..."
            multiline
            numberOfLines={3}
            className="bg-white rounded-lg px-3 py-3 border border-gray-200 text-base"
            style={{
              fontFamily: 'PublicSans_400Regular',
              textAlignVertical: 'top',
            }}
          />
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3 mb-8 px-4" >
          <Pressable
            onPress={() => {
              trackEvent('payment_dialog_cancelled', {
                payment_amount: parseFloat(amount) || 0,
                government_topup: parseFloat(topUp) || 0,
                ...getChildAnalyticsProperties([child])
              });
              onCancel();
            }}
            className="flex-1 bg-gray-200 rounded-lg p-4"
          >
            <Text className="text-center font-semibold text-gray-700" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
              Cancel
            </Text>
          </Pressable>

          <Pressable
            onPress={handleConfirm}
            className="flex-1 bg-blue-500 rounded-lg p-4 flex-row items-center justify-center"
          >
            <FontAwesomeIcon icon={faCheck} size={16} color="white" />
            <Text className="text-white font-semibold ml-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
              Confirm Payment
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};