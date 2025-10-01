import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useForm } from '@tanstack/react-form';
import type { Child } from '../app/(tabs)/index';

interface AddChildModalProps {
  onAddChild: (child: Omit<Child, 'id'>) => void;
}

export interface AddChildModalRef {
  present: () => void;
  dismiss: () => void;
}

export const AddChildModal = forwardRef<AddChildModalRef, AddChildModalProps>(function AddChildModal({
  onAddChild,
}, ref) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [showDateOfBirthPicker, setShowDateOfBirthPicker] = useState(false);
  const [showReconfirmationDatePicker, setShowReconfirmationDatePicker] = useState(false);

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetModalRef.current?.present(),
    dismiss: () => bottomSheetModalRef.current?.dismiss(),
  }));

  const form = useForm({
    defaultValues: {
      name: '',
      dateOfBirth: null as Date | null,
      reconfirmationDate: null as Date | null,
    },
    onSubmit: async ({ value }) => {
      // Validate dates before submission
      if (!value.dateOfBirth || !value.reconfirmationDate) {
        return;
      }

      const child: Omit<Child, 'id'> = {
        name: value.name.trim() || undefined,
        dateOfBirth: value.dateOfBirth.toISOString().split('T')[0],
        reconfirmationDate: value.reconfirmationDate.toISOString().split('T')[0],
        quarterlyTopUpReceived: 0,
      };

      onAddChild(child);
      form.reset();
      bottomSheetModalRef.current?.dismiss();
    },
  });


  const formatDateDisplay = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const canSubmit = form.state.values.dateOfBirth && form.state.values.reconfirmationDate;

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={['90%']}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      onDismiss={() => form.reset()}
    >
      <BottomSheetView className='pb-5 px-5 flex-1'>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-white border-b border-gray-200 px-4 py-4 mb-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold" style={{ fontFamily: 'PublicSans_700Bold' }}>
                  Add Child
                </Text>
                <Pressable
                  onPress={form.handleSubmit}
                  disabled={!canSubmit}
                  className={`px-4 py-2 rounded-lg ${canSubmit ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                  <Text
                    className={`font-semibold ${canSubmit ? 'text-white' : 'text-gray-500'}`}
                    style={{ fontFamily: 'PublicSans_600SemiBold' }}
                  >
                    Add
                  </Text>
                </Pressable>
              </View>
            </View>

            <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
              {/* Name Field */}
              <form.Field name="name">
                {(field) => (
                  <View className="mb-6">
                    <Text className="text-base font-semibold mb-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                      Child&apos;s Name (Optional)
                    </Text>
                    <TextInput
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      placeholder="Enter your child's name"
                      className="bg-white rounded-lg px-4 py-3 border border-gray-200 text-base"
                      style={{ fontFamily: 'PublicSans_400Regular' }}
                    />
                    <Text className="text-sm text-gray-500 mt-2" style={{ fontFamily: 'PublicSans_400Regular' }}>
                      This helps you identify your child in the app
                    </Text>
                  </View>
                )}
              </form.Field>

              {/* Date of Birth */}
              <form.Field name="dateOfBirth">
                {(field) => (
                  <View className="mb-6">
                    <Text className="text-base font-semibold mb-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                      Date of Birth *
                    </Text>
                    <Pressable
                      onPress={() => setShowDateOfBirthPicker(true)}
                      className="bg-white rounded-lg px-4 py-3 border border-gray-200"
                    >
                      <Text
                        className={`text-base ${field.state.value ? 'text-black' : 'text-gray-400'}`}
                        style={{ fontFamily: 'PublicSans_400Regular' }}
                      >
                        {field.state.value ? formatDateDisplay(field.state.value) : 'Select date of birth'}
                      </Text>
                    </Pressable>
                    <Text className="text-sm text-gray-500 mt-2" style={{ fontFamily: 'PublicSans_400Regular' }}>
                      Used to calculate your child&apos;s age
                    </Text>
                    {showDateOfBirthPicker && (
                      <DateTimePicker
                        value={field.state.value || new Date()}
                        mode="date"
                        display="default"
                        onChange={(_, selectedDate) => {
                          setShowDateOfBirthPicker(false);
                          if (selectedDate) {
                            field.handleChange(selectedDate);
                          }
                        }}
                        maximumDate={new Date()}
                      />
                    )}
                  </View>
                )}
              </form.Field>

              {/* Reconfirmation Date */}
              <form.Field name="reconfirmationDate">
                {(field) => (
                  <View className="mb-6">
                    <Text className="text-base font-semibold mb-2" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                      Last Reconfirmation Date *
                    </Text>
                    <Pressable
                      onPress={() => setShowReconfirmationDatePicker(true)}
                      className="bg-white rounded-lg px-4 py-3 border border-gray-200"
                    >
                      <Text
                        className={`text-base ${field.state.value ? 'text-black' : 'text-gray-400'}`}
                        style={{ fontFamily: 'PublicSans_400Regular' }}
                      >
                        {field.state.value ? formatDateDisplay(field.state.value) : 'Select reconfirmation date'}
                      </Text>
                    </Pressable>
                    <Text className="text-sm text-gray-500 mt-2" style={{ fontFamily: 'PublicSans_400Regular' }}>
                      The date you last reconfirmed your Tax-Free Childcare account. This helps calculate quarterly limits.
                    </Text>
                    {showReconfirmationDatePicker && (
                      <DateTimePicker
                        value={field.state.value || new Date()}
                        mode="date"
                        display="default"
                        onChange={(_, selectedDate) => {
                          setShowReconfirmationDatePicker(false);
                          if (selectedDate) {
                            field.handleChange(selectedDate);
                          }
                        }}
                        maximumDate={new Date()}
                      />
                    )}
                  </View>
                )}
              </form.Field>

              {/* Info Card */}
              <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <View className="flex-row items-start">
                  <FontAwesomeIcon icon={faInfoCircle} size={16} color="#3b82f6" />
                  <View className="ml-3 flex-1">
                    <Text className="text-sm font-medium text-blue-900" style={{ fontFamily: 'PublicSans_600SemiBold' }}>
                      About Quarterly Limits
                    </Text>
                    <Text className="text-sm text-blue-800 mt-1" style={{ fontFamily: 'PublicSans_400Regular' }}>
                      Each child has a £500 quarterly government contribution limit. The quarter resets every 3 months from your reconfirmation date.
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});