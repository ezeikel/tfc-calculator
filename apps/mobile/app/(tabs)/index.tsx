import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle, faChild, faPlus } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalculatorCard } from '../../components/CalculatorCard';
import { AddChildModal, AddChildModalRef } from '../../components/bottom-sheets/AddChildModal';
import { PaymentConfirmationModal, PaymentConfirmationModalRef } from '../../components/bottom-sheets/PaymentConfirmationModal';
import { PaymentHistoryModal, PaymentHistoryModalRef } from '../../components/bottom-sheets/PaymentHistoryModal';

export type Child = {
  id: string;
  name?: string;
  dateOfBirth: string;
  reconfirmationDate: string;
  quarterlyTopUpReceived: number;
};

export type Payment = {
  id: string;
  childId: string;
  amount: number;
  parentPaid: number;
  governmentTopUp: number;
  date: string;
  description?: string;
};

export default function CalculatorScreen() {
  const [children, setChildren] = useState<Child[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const addChildModalRef = useRef<AddChildModalRef>(null);

  const paymentModalRef = useRef<PaymentConfirmationModalRef>(null);
  const historyModalRef = useRef<PaymentHistoryModalRef>(null);
  const [activeChild, setActiveChild] = useState<Child | null>(null);
  const [calculationData, setCalculationData] = useState<{
    userPayment: number;
    governmentTopUp: number;
  } | null>(null);


  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem('tfc-children', JSON.stringify(children));
        await AsyncStorage.setItem('tfc-payments', JSON.stringify(payments));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    save();
  }, [children, payments]);

  const loadData = async () => {
    try {
      const savedChildren = await AsyncStorage.getItem('tfc-children');
      const savedPayments = await AsyncStorage.getItem('tfc-payments');

      if (savedChildren) {
        setChildren(JSON.parse(savedChildren));
      } else {
        // Add sample child
        const sampleChild: Child = {
          id: 'sample-child-1',
          name: 'Emma',
          dateOfBirth: '2020-03-15',
          reconfirmationDate: '2025-01-01',
          quarterlyTopUpReceived: 160,
        };
        setChildren([sampleChild]);
      }

      if (savedPayments) {
        setPayments(JSON.parse(savedPayments));
      } else {
        // Add sample payments
        const currentDate = new Date();
        const samplePayments: Payment[] = [
          {
            id: 'sample-payment-1',
            childId: 'sample-child-1',
            amount: 400,
            parentPaid: 320,
            governmentTopUp: 80,
            date: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            description: 'Weekly nursery fees',
          },
        ];
        setPayments(samplePayments);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };


  const addChild = (child: Omit<Child, 'id'>) => {
    const newChild: Child = {
      ...child,
      id: Date.now().toString(),
    };
    setChildren([...children, newChild]);
  };

  const updateChild = (id: string, updates: Partial<Child>) => {
    setChildren(children.map((child) => (child.id === id ? { ...child, ...updates } : child)));
  };

  const removeChild = (id: string) => {
    Alert.alert(
      'Remove Child',
      'Are you sure you want to remove this child and all their payment history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setChildren(children.filter((child) => child.id !== id));
            setPayments(payments.filter((payment) => payment.childId !== id));
          },
        },
      ]
    );
  };

  const addPayment = (payment: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...payment,
      id: Date.now().toString(),
    };
    setPayments([...payments, newPayment]);
  };

  const removePayment = (paymentId: string) => {
    setPayments(payments.filter((payment) => payment.id !== paymentId));
  };

  // Modal handlers
  const openPaymentSheet = (child: Child, userPayment: number, governmentTopUp: number) => {
    setActiveChild(child);
    setCalculationData({ userPayment, governmentTopUp });
    paymentModalRef.current?.present();
  };

  const openHistorySheet = (child: Child) => {
    setActiveChild(child);
    historyModalRef.current?.present();
  };

  const handleConfirmPayment = (payment: Omit<Payment, 'id'>) => {
    addPayment(payment);
    if (activeChild && calculationData) {
      const currentTopUp = payments
        .filter(p => p.childId === activeChild.id)
        .reduce((sum, p) => sum + p.governmentTopUp, 0);
      const newTopUpTotal = currentTopUp + payment.governmentTopUp;
      updateChild(activeChild.id, { quarterlyTopUpReceived: newTopUpTotal });
    }
    paymentModalRef.current?.dismiss();
    setActiveChild(null);
    setCalculationData(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['left', 'right']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4 flex-1 min-h-screen">
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row items-start">
              <View className="bg-blue-100 rounded-lg p-2 mr-3">
                <FontAwesomeIcon icon={faInfoCircle} size={20} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'PublicSans_400Regular' }}>
                  Add your childcare costs and we&apos;ll show how much you need to pay into your Tax-Free Childcare account
                  — and how much the government will top up.
                </Text>
                <View className="flex-row flex-wrap mt-3 gap-2">
                  <View className="bg-gray-100 px-2 py-1 rounded">
                    <Text className="text-xs text-gray-600" style={{ fontFamily: 'PublicSans_400Regular' }}>
                      20% contribution
                    </Text>
                  </View>
                  <View className="bg-gray-100 px-2 py-1 rounded">
                    <Text className="text-xs text-gray-600" style={{ fontFamily: 'PublicSans_400Regular' }}>
                      £500 quarterly limit
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Children List */}
          {children.length === 0 ? (
            <View className="bg-white rounded-xl p-8 items-center shadow-sm border border-gray-100">
              <View className="bg-gray-100 rounded-full p-4 mb-4">
                <FontAwesomeIcon icon={faChild} size={32} color="#6b7280" />
              </View>
              <Text className="text-lg font-semibold text-center mb-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                No children added yet
              </Text>
              <Text className="text-sm text-gray-600 text-center mb-6 max-w-xs" style={{ fontFamily: 'PublicSans_400Regular' }}>
                Add your first child to start calculating government contributions for your childcare costs.
              </Text>
              <Pressable
                onPress={() => addChildModalRef.current?.present()}
                className="bg-blue-500 px-6 py-3 rounded-lg flex-row items-center"
              >
                <FontAwesomeIcon icon={faPlus} size={16} color="white" />
                <Text className="text-white font-semibold ml-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                  Add Your First Child
                </Text>
              </Pressable>
            </View>
          ) : (
            <View className="gap-y-4">
              {children.map((child) => (
                <CalculatorCard
                  key={child.id}
                  child={child}
                  payments={payments.filter((payment) => payment.childId === child.id)}
                  onUpdateChild={(updates) => updateChild(child.id, updates)}
                  onRemoveChild={() => removeChild(child.id)}
                  onAddPayment={addPayment}
                  onRemovePayment={removePayment}
                  onOpenPaymentSheet={openPaymentSheet}
                  onOpenHistorySheet={openHistorySheet}
                />
              ))}

              <Pressable
                onPress={() => addChildModalRef.current?.present()}
                className="bg-white rounded-xl p-6 items-center border-2 border-dashed border-gray-300"
              >
                <FontAwesomeIcon icon={faPlus} size={24} color="#6b7280" />
                <Text className="text-gray-600 font-semibold mt-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                  Add Another Child
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>


      <AddChildModal
        ref={addChildModalRef}
        onAddChild={addChild}
      />

      <PaymentConfirmationModal
        ref={paymentModalRef}
        child={activeChild}
        suggestedAmount={calculationData?.userPayment || 0}
        suggestedTopUp={calculationData?.governmentTopUp || 0}
        onConfirm={handleConfirmPayment}
        onCancel={() => {
          paymentModalRef.current?.dismiss();
          setActiveChild(null);
          setCalculationData(null);
        }}
      />

      <PaymentHistoryModal
        ref={historyModalRef}
        payments={activeChild ? payments.filter((payment) => payment.childId === activeChild.id) : []}
        reconfirmationDate={activeChild?.reconfirmationDate || ''}
        onRemovePayment={removePayment}
      />
    </SafeAreaView>
  );
}