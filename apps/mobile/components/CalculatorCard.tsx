import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faCalendar, faHistory, faTrash, faExclamationTriangle, faCalculator, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import type { Child, Payment } from '../app/(tabs)/index';

interface CalculatorCardProps {
  child: Child;
  payments: Payment[];
  onUpdateChild: (updates: Partial<Child>) => void;
  onRemoveChild: () => void;
  onAddPayment: (payment: Omit<Payment, 'id'>) => void;
  onRemovePayment: (paymentId: string) => void;
  onOpenPaymentSheet: (child: Child, userPayment: number, governmentTopUp: number) => void;
  onOpenHistorySheet: (child: Child) => void;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  child,
  payments,
  onUpdateChild,
  onRemoveChild,
  onAddPayment,
  onRemovePayment,
  onOpenPaymentSheet,
  onOpenHistorySheet,
}) => {
  const [childcareCost, setChildcareCost] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(child.name || '');

  const getChildAge = () => {
    const today = new Date();
    const birthDate = new Date(child.dateOfBirth);
    const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());

    if (ageInMonths < 12) {
      return `${ageInMonths} months`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years}y ${months}m` : `${years} years`;
    }
  };

  const getDaysRemainingInQuarter = () => {
    const today = new Date();
    const reconfirmDate = new Date(child.reconfirmationDate);
    const quarterEnd = new Date(reconfirmDate);
    quarterEnd.setMonth(quarterEnd.getMonth() + 3);

    if (today > quarterEnd) {
      const monthsPassed = Math.floor((today.getTime() - reconfirmDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
      const quartersCompleted = Math.floor(monthsPassed / 3);
      const nextQuarterEnd = new Date(reconfirmDate);
      nextQuarterEnd.setMonth(nextQuarterEnd.getMonth() + (quartersCompleted + 1) * 3);

      const timeDiff = nextQuarterEnd.getTime() - today.getTime();
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    const timeDiff = quarterEnd.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const calculateContribution = () => {
    const cost = parseFloat(childcareCost) || 0;
    const maxQuarterlyTopUp = 500;

    const confirmedTopUpThisQuarter = payments.reduce((sum, payment) => sum + payment.governmentTopUp, 0);
    const remainingTopUp = maxQuarterlyTopUp - confirmedTopUpThisQuarter;
    const potentialTopUp = cost * 0.2;
    const actualTopUp = Math.min(potentialTopUp, remainingTopUp);
    const userPayment = cost - actualTopUp;

    return {
      userPayment: Math.max(0, userPayment),
      governmentTopUp: actualTopUp,
      remainingThisQuarter: remainingTopUp - actualTopUp,
      isAtLimit: remainingTopUp <= 0,
      exceedsLimit: potentialTopUp > remainingTopUp,
      confirmedTopUpUsed: confirmedTopUpThisQuarter,
    };
  };

  const calculation = calculateContribution();
  const daysRemaining = getDaysRemainingInQuarter();
  const progressPercentage = (calculation.confirmedTopUpUsed / 500) * 100;

  const handleNameEdit = () => {
    onUpdateChild({ name: editName.trim() || undefined });
    setIsEditing(false);
  };

  const handleOpenPaymentSheet = () => {
    // Only open if there's a valid calculation with values > 0
    if (calculation.governmentTopUp > 0 && calculation.userPayment >= 0) {
      onOpenPaymentSheet(child, calculation.userPayment, calculation.governmentTopUp);
    }
  };

  const handleOpenHistorySheet = () => {
    onOpenHistorySheet(child);
  };

  return (
    <>
      <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            {isEditing ? (
              <TextInput
                value={editName}
                onChangeText={setEditName}
                placeholder="Child&apos;s name (optional)"
                className="text-lg font-semibold border-b border-gray-300 pb-1"
                style={{ fontFamily: 'PublicSans_600SemiBold' }}
                onBlur={handleNameEdit}
                onSubmitEditing={handleNameEdit}
                autoFocus
              />
            ) : (
              <View className="flex-row items-center">
                <Text className="text-lg font-semibold" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                  {child.name || 'Unnamed Child'}
                </Text>
                <Pressable
                  onPress={() => setIsEditing(true)}
                  className="ml-2 p-1"
                >
                  <FontAwesomeIcon icon={faEdit} size={14} color="#6b7280" />
                </Pressable>
              </View>
            )}

            <View className="flex-row items-center mt-2 gap-4">
              <View className="bg-gray-100 px-2 py-1 rounded">
                <Text className="text-xs text-gray-600" style={{ fontFamily: 'PublicSans_400Regular' }}>
                  {getChildAge()}
                </Text>
              </View>
              <View className="flex-row items-center">
                <FontAwesomeIcon icon={faCalendar} size={12} color="#6b7280" />
                <Text className="text-xs text-gray-600 ml-1" style={{ fontFamily: 'PublicSans_400Regular' }}>
                  {daysRemaining} days left
                </Text>
              </View>
              {payments.length > 0 && (
                <View className="bg-blue-100 px-2 py-1 rounded">
                  <Text className="text-xs text-blue-600" style={{ fontFamily: 'PublicSans_400Regular' }}>
                    {payments.length} payment{payments.length !== 1 ? 's' : ''}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View className="flex-row gap-2">
            {payments.length > 0 && (
              <Pressable
                onPress={handleOpenHistorySheet}
                className="bg-gray-100 px-3 py-2 rounded-lg"
              >
                <FontAwesomeIcon icon={faHistory} size={14} color="#6b7280" />
              </Pressable>
            )}
            <Pressable
              onPress={onRemoveChild}
              className="bg-red-100 px-3 py-2 rounded-lg"
            >
              <FontAwesomeIcon icon={faTrash} size={14} color="#dc2626" />
            </Pressable>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm text-gray-600" style={{ fontFamily: 'PublicSans_400Regular' }}>
              Government top-up used this quarter
            </Text>
            <Text className="text-sm font-medium" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
              £{calculation.confirmedTopUpUsed.toFixed(2)} / £500.00
            </Text>
          </View>
          <View className="bg-gray-200 rounded-full h-2">
            <View
              className="bg-blue-500 rounded-full h-2"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </View>
          {calculation.isAtLimit && (
            <View className="flex-row items-center mt-2">
              <FontAwesomeIcon icon={faExclamationTriangle} size={12} color="#f59e0b" />
              <Text className="text-xs text-amber-600 ml-1" style={{ fontFamily: 'PublicSans_400Regular' }}>
                You&apos;ve reached the quarterly limit
              </Text>
            </View>
          )}
        </View>

        {/* Calculator Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium mb-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
            Total Childcare Cost
          </Text>
          <View className="flex-row items-center bg-gray-50 rounded-lg px-3 py-3">
            <Text className="text-gray-600 mr-2" style={{ fontFamily: 'PublicSans_400Regular' }}>£</Text>
            <TextInput
              value={childcareCost}
              onChangeText={setChildcareCost}
              placeholder="0.00"
              keyboardType="numeric"
              className="flex-1 text-base"
              style={{ fontFamily: 'PublicSans_400Regular' }}
            />
          </View>
          <Text className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'PublicSans_400Regular' }}>
            Enter the total amount you need to pay for childcare
          </Text>
        </View>

        {/* Results */}
        {childcareCost && parseFloat(childcareCost) > 0 && (
          <>
            <View className="border-t border-gray-100 pt-4 mb-4">
              <View className="flex-row items-center mb-3">
                <FontAwesomeIcon icon={faCalculator} size={16} color="#3b82f6" />
                <Text className="text-base font-semibold ml-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                  Calculation Results
                </Text>
              </View>

              <View className="bg-gray-50 rounded-xl p-4">
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-sm text-gray-600" style={{ fontFamily: 'PublicSans_400Regular' }}>You Pay</Text>
                  <Text className="text-xl font-bold" style={{ fontFamily: 'PublicSans_700Bold' }}>
                    £{calculation.userPayment.toFixed(2)}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-sm text-gray-600" style={{ fontFamily: 'PublicSans_400Regular' }}>Government Adds</Text>
                  <Text className="text-xl font-bold text-green-600" style={{ fontFamily: 'PublicSans_700Bold' }}>
                    £{calculation.governmentTopUp.toFixed(2)}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-gray-600" style={{ fontFamily: 'PublicSans_400Regular' }}>Remaining This Quarter</Text>
                  <Text className="text-lg font-semibold" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                    £{calculation.remainingThisQuarter.toFixed(2)}
                  </Text>
                </View>
              </View>

              {calculation.exceedsLimit && !calculation.isAtLimit && (
                <View className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                  <View className="flex-row items-start">
                    <FontAwesomeIcon icon={faExclamationTriangle} size={14} color="#f59e0b" />
                    <View className="ml-2 flex-1">
                      <Text className="text-sm font-medium text-amber-800" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                        Quarterly limit reached
                      </Text>
                      <Text className="text-sm text-amber-700 mt-1" style={{ fontFamily: 'PublicSans_400Regular' }}>
                        You can only receive £{calculation.remainingThisQuarter.toFixed(2)} more this quarter.
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            <Pressable
              onPress={handleOpenPaymentSheet}
              disabled={calculation.governmentTopUp <= 0}
              className={`rounded-lg p-4 flex-row items-center justify-center ${calculation.governmentTopUp <= 0 ? 'bg-gray-200' : 'bg-blue-500'
                }`}
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                size={16}
                color={calculation.governmentTopUp <= 0 ? '#9ca3af' : 'white'}
              />
              <Text
                className={`font-semibold ml-2 ${calculation.governmentTopUp <= 0 ? 'text-gray-500' : 'text-white'
                  }`}
                style={{ fontFamily: 'PublicSans_600SemiBold' }}
              >
                Confirm This Payment
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </>
  );
};