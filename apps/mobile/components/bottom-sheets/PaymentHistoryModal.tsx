import React, { useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { PaymentHistorySheet } from './PaymentHistorySheet';
import type { Payment } from '../../app/(tabs)/index';

interface PaymentHistoryModalProps {
  payments: Payment[];
  reconfirmationDate: string;
  onRemovePayment: (paymentId: string) => void;
}

export interface PaymentHistoryModalRef {
  present: () => void;
  dismiss: () => void;
}

export const PaymentHistoryModal = forwardRef<PaymentHistoryModalRef, PaymentHistoryModalProps>(
  function PaymentHistoryModal({ payments, reconfirmationDate, onRemovePayment }, ref) {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%', '90%'], []);

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
          <PaymentHistorySheet
            payments={payments}
            reconfirmationDate={reconfirmationDate}
            onRemovePayment={onRemovePayment}
          />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);