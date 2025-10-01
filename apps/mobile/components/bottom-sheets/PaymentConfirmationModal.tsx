import React, { useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { PaymentConfirmationSheet } from './PaymentConfirmationSheet';
import type { Child, Payment } from '../../app/(tabs)/index';

interface PaymentConfirmationModalProps {
  child: Child | null;
  suggestedAmount: number;
  suggestedTopUp: number;
  onConfirm: (payment: Omit<Payment, 'id'>) => void;
  onCancel: () => void;
}

export interface PaymentConfirmationModalRef {
  present: () => void;
  dismiss: () => void;
}

export const PaymentConfirmationModal = forwardRef<PaymentConfirmationModalRef, PaymentConfirmationModalProps>(
  function PaymentConfirmationModal({ child, suggestedAmount, suggestedTopUp, onConfirm, onCancel }, ref) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['65%'], []);

    useImperativeHandle(ref, () => ({
      present: () => bottomSheetModalRef.current?.present(),
      dismiss: () => bottomSheetModalRef.current?.dismiss(),
    }));

    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    );

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
      >
        <BottomSheetView style={{ flex: 1 }}>
          {child && (
            <PaymentConfirmationSheet
              child={child}
              suggestedAmount={suggestedAmount}
              suggestedTopUp={suggestedTopUp}
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);